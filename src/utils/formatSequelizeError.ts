import { ErrorResponseDto } from "../dto/responseDto";
import { ErrorCode } from "../dto/errorCodes";
import { ValidationErrorItem } from 'sequelize';

const formatSequelizeError = (error: any): ErrorResponseDto[] => {
  const formattedErrors: ErrorResponseDto[] = [];

  if (error.errors) {
    error.errors.forEach((err: ValidationErrorItem) => {
      let errorCode: ErrorCode;

      switch (err.validatorKey) {
        case 'not_unique':
          errorCode = ErrorCode.UNIQUE_CONSTRAINT;
          break;
        case 'is_null':
          errorCode = ErrorCode.REQUIRED;
          break;
        case 'isEmail':
          errorCode = ErrorCode.INVALID_EMAIL;
          break;
        case 'not_found':
          errorCode = ErrorCode.NOT_FOUND;
          break;
        case 'update_failed':
          errorCode = ErrorCode.UPDATE_FAILED;
          break;
        case 'invalid_credentials':
          errorCode = ErrorCode.INVALID_CREDENTIALS;
          break;
        case 'unauthorized':
          errorCode = ErrorCode.UNAUTHORIZED;
          break;
        default:
          errorCode = ErrorCode.VALIDATION_ERROR;
          break;
      }

      formattedErrors.push({
        errorCode,
        errorMessage: err.message,
        field: err.path ?? undefined,
      });
    });
  } else {
    formattedErrors.push({
      errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
      errorMessage: error.message,
    });
  }

  return formattedErrors;
};

export default formatSequelizeError;