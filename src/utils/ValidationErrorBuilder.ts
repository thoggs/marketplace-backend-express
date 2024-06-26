import { ValidationError, ValidationErrorItem, Model } from 'sequelize';

class ValidationErrorBuilder {
  static buildError(
    message: string,
    validatorKey: string,
    path: string,
    value: string,
    instance:
      Model
  ): ValidationError {
    const errorItem = new ValidationErrorItem(
      message,
      'validation error',
      path,
      value,
      instance,
      validatorKey,
      validatorKey,
      []
    );
    return new ValidationError('Validation error', [ errorItem ]);
  }
}

export default ValidationErrorBuilder;
