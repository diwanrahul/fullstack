const sendSuccess = (
  res,
  data = null,
  message = "Success",
  statusCode = 200
) => {
  const response = {
    success: true,
    message: message,
    status: statusCode,
    ...(data && { data: data }),
  };

  return res.status(statusCode).json(response);
};

const sendError = (
  res,
  message = "Internal Server Error",
  statusCode = 500,
  errors = null
) => {
  const response = {
    success: false,
    message: message,
    status: statusCode,
    ...(errors && { errors: errors }),
  };

  return res.status(statusCode).json(response);
};

module.exports = {
  sendSuccess,
  sendError,
};
