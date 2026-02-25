import * as Yup from "yup";

import AppError from "../../errors/AppError";
import Queue from "../../models/Queue";
import User from "../../models/User";
import UsersQueues from "../../models/UsersQueues";

interface UserQueues {
  id?: number;
  queue?: number;
}

interface UserData {
  email?: string;
  password?: string;
  name?: string;
  profile?: string;
  queues?: UserQueues[];
  loginAllowedStartTime?: string;
  loginAllowedEndTime?: string;
  allowedIpList?: string[];
}

interface Request {
  userData: UserData;
  userId: string | number;
  tenantId: string | number;
}

interface Response {
  id: number;
  name: string;
  email: string;
  profile: string;
}

const UpdateUserService = async ({
  userData,
  userId,
  tenantId
}: Request): Promise<Response | undefined> => {
  const user = await User.findOne({
    where: { id: userId, tenantId },
    attributes: ["name", "id", "email", "profile"]
  });

  if (!user) {
    throw new AppError("ERR_NO_USER_FOUND", 404);
  }

  const schema = Yup.object().shape({
    name: Yup.string().min(2),
    email: Yup.string().email(),
    profile: Yup.string(),
    password: Yup.string(),
    loginAllowedStartTime: Yup.string().nullable(),
    loginAllowedEndTime: Yup.string().nullable(),
    allowedIpList: Yup.array().of(Yup.string().trim().required()).nullable()
  });

  const {
    email,
    password,
    profile,
    name,
    queues,
    loginAllowedStartTime,
    loginAllowedEndTime,
    allowedIpList
  } = userData;

  try {
    await schema.validate({
      email,
      password,
      profile,
      name,
      loginAllowedStartTime,
      loginAllowedEndTime,
      allowedIpList
    });
  } catch (err: any) {
    throw new AppError(err?.message);
  }

  if (queues) {
    await UsersQueues.destroy({ where: { userId } });
    await Promise.all(
      queues.map(async (queue: any) => {
        const queueId: number = queue?.id || queue;
        // const { id: queueId } = queue;
        await UsersQueues.upsert({ queueId, userId });
      })
    );
  }

  await user.update({
    email,
    password,
    profile,
    name,
    loginAllowedStartTime,
    loginAllowedEndTime,
    allowedIpList
  });

  await user.reload({
    attributes: ["id", "name", "email", "profile"],
    include: [{ model: Queue, attributes: ["id", "queue"] }]
  });

  const serializedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    profile: user.profile,
    queues: user.queues
  };

  return serializedUser;
};

export default UpdateUserService;
