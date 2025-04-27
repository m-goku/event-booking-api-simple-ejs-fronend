export const InternalServerError500 = (res, error) => {
  return res.status(500).json({
    status: "FAILED",
    message: "Internal Server Error",
    error: error.message,
  });
};

export const ConflictError409 = (res, message) => {
  return res.status(409).json({
    status: "FAILED",
    message: message,
  });
};

export const createdSuccess201 = (res, message, data) => {
  return res.status(201).json({
    status: "Success",
    message: message,
    data: data,
  });
};

export const NotFound404 = (res, message) => {
  return res.status(404).json({
    status: "FAILED",
    message: message,
  });
};

export const Forbidden403 = (res, message) => {
  return res.status(403).json({
    status: "FAILED",
    message: message,
  });
};

export const Success200 = (res, message, data?: any) => {
  return res.header().status(200).json({
    status: "SUCCESS",
    message: message,
    data: data,
  });
};
