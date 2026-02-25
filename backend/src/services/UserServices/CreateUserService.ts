import * as Yup from "yup";

import AppError from "../../errors/AppError";
import User from "../../models/User";

interface Request {
  email: string;
  password: string;
  name: string;
  tenantId: string | number;
  profile?: string;
  loginAllowedStartTime?: string;
  loginAllowedEndTime?: string;
  allowedIpList?: string[];
}

interface Response {
  email: string;
  name: string;
  id: number;
  profile: string;
}

const CreateUserService = async ({
  email,
  password,
  name,
  tenantId,
  profile = "admin",
  loginAllowedStartTime,
  loginAllowedEndTime,
  allowedIpList
}: Request): Promise<Response> => {
  const schema = Yup.object().shape({
    name: Yup.string().required().min(2),
    tenantId: Yup.number().required(),
    email: Yup.string()
      .email()
      .required()
      .test(
        "Check-email",
        "An user with this email already exists.",
        async value => {
          const emailExists = await User.findOne({
            where: { email: value! }
          });
          return !emailExists;
        }
      ),
    password: Yup.string().required().min(5),
    loginAllowedStartTime: Yup.string().nullable(),
    loginAllowedEndTime: Yup.string().nullable(),
    allowedIpList: Yup.array().of(Yup.string().trim().required()).nullable()
  });

  try {
    await schema.validate({
      email,
      password,
      name,
      tenantId,
      loginAllowedStartTime,
      loginAllowedEndTime,
      allowedIpList
    });
  } catch (err) {
    throw new AppError(err.message);
  }

  const user = await User.create({
    email,
    password,
    name,
    profile,
    tenantId,
    loginAllowedStartTime,
    loginAllowedEndTime,
    allowedIpList
  });

  const serializedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    profile: user.profile
  };

  return serializedUser;
};

export default CreateUserService;
