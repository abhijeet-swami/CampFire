import ApiError from "../utils/ApiError.util.js";

const errorMiddleware = (error, req, res, next) => {
  const isApiError = error instanceof ApiError;

  const statusCode = isApiError ? error.statusCode : 500;
  const message = isApiError ? error.message : "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
