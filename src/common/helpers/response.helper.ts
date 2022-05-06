export class ResponseHelper {
  async success(data: [] | any, message = 'Success') {
    return {
      data: data,
      errorCode: 0,
      message,
      errors: [],
    };
  }

  async created(data: any, message = 'Created') {
    return {
      data,
      errorCode: 0,
      message,
      errors: [],
    };
  }

  async noContent(data: [] | any, message = 'No Content') {
    return {
      data,
      errorCode: 0,
      message,
      errors: [],
    };
  }

  async badRequest(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      errorCode,
      message,
      errors,
    };
  }

  async unauthorized(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      errorCode,
      message,
      errors,
    };
  }

  async forbidden(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      message,
      errorCode,
      errors,
    };
  }

  async notFound(data: [] | any, message: string, errors?: []) {
    return {
      data,
      message,
      errorCode: 0,
      errors,
    };
  }

  async resourceExist(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      message,
      errorCode,
      errors,
    };
  }

  async unsupportedMedia(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      message,
      errorCode,
      errors,
    };
  }

  async internalServerError(message: string, errorCode: number, errors: []) {
    return {
      data: [],
      message,
      errorCode,
      errors,
    };
  }
}
