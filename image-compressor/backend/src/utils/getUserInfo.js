const getUserInfo = (req) => {
  const token =
    req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];
  return token;
};

module.exports = getUserInfo;
