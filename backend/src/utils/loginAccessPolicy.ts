interface LoginPolicyInput {
  allowedIpList?: string[] | null;
  loginAllowedStartTime?: string | null;
  loginAllowedEndTime?: string | null;
  requestIp?: string | null;
  now?: Date;
}

const parseTimeToMinutes = (value: string): number => {
  const [hour, minute] = value.split(":").map(Number);
  return (hour * 60) + minute;
};

const normalizeIp = (ip?: string | null): string => {
  if (!ip) return "";
  if (ip.startsWith("::ffff:")) {
    return ip.replace("::ffff:", "");
  }
  return ip;
};

const isTimeAllowed = (
  start?: string | null,
  end?: string | null,
  now: Date = new Date()
): boolean => {
  if (!start || !end) return true;

  const current = (now.getHours() * 60) + now.getMinutes();
  const startMinutes = parseTimeToMinutes(start);
  const endMinutes = parseTimeToMinutes(end);

  if (startMinutes <= endMinutes) {
    return current >= startMinutes && current <= endMinutes;
  }

  return current >= startMinutes || current <= endMinutes;
};

const isIpAllowed = (
  requestIp?: string | null,
  allowList?: string[] | null
): boolean => {
  if (!allowList || allowList.length === 0) {
    return true;
  }

  const normalizedRequestIp = normalizeIp(requestIp);
  const normalizedAllowList = allowList.map(ip => normalizeIp(ip));

  return normalizedAllowList.includes(normalizedRequestIp);
};

export const canUserLogin = ({
  allowedIpList,
  loginAllowedStartTime,
  loginAllowedEndTime,
  requestIp,
  now = new Date()
}: LoginPolicyInput): boolean => {
  return (
    isTimeAllowed(loginAllowedStartTime, loginAllowedEndTime, now) &&
    isIpAllowed(requestIp, allowedIpList)
  );
};
