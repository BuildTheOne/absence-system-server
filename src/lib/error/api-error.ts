import { HttpStatus } from '@/constants/http-status';
import { Message } from '@/constants/messages';

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.BAD_REQUEST, message);
    if (!message) {
      this.message = Message.BAD_REQUEST;
    }
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.UNAUTHORIZED, message);
    if (!message) {
      this.message = Message.UNAUTHORIZED;
    }
  }
}

export class PaymentRequiredError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.PAYMENT_REQUIRED, message);
    if (!message) {
      this.message = Message.PAYMENT_REQUIRED;
    }
  }
}

export class ForbiddenError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.FORBIDDEN, message);
    if (!message) {
      this.message = Message.FORBIDDEN;
    }
  }
}

export class NotFoundError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.NOT_FOUND, message);
    if (!message) {
      this.message = Message.NOT_FOUND;
    }
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.METHOD_NOT_ALLOWED, message);
    if (!message) {
      this.message = Message.METHOD_NOT_ALLOWED;
    }
  }
}

export class NotAcceptableError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.NOT_ACCEPTABLE, message);
    if (!message) {
      this.message = Message.NOT_ACCEPTABLE;
    }
  }
}

export class ProxyAuthenticationRequiredError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.PROXY_AUTHENTICATION_REQUIRED, message);
    if (!message) {
      this.message = Message.PROXY_AUTHENTICATION_REQUIRED;
    }
  }
}

export class RequestTimeoutError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.REQUEST_TIMEOUT, message);
    if (!message) {
      this.message = Message.REQUEST_TIMEOUT;
    }
  }
}

export class ConflictError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.CONFLICT, message);
    if (!message) {
      this.message = Message.CONFLICT;
    }
  }
}

export class GoneError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.GONE, message);
    if (!message) {
      this.message = Message.GONE;
    }
  }
}

export class LengthRequiredError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.LENGTH_REQUIRED, message);
    if (!message) {
      this.message = Message.LENGTH_REQUIRED;
    }
  }
}

export class PreconditionFailedError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.PRECONDITION_FAILED, message);
    if (!message) {
      this.message = Message.PRECONDITION_FAILED;
    }
  }
}

export class PayloadTooLargeError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.PAYLOAD_TOO_LARGE, message);
    if (!message) {
      this.message = Message.PAYLOAD_TOO_LARGE;
    }
  }
}

export class URITooLongError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.URI_TOO_LONG, message);
    if (!message) {
      this.message = Message.URI_TOO_LONG;
    }
  }
}

export class UnsupportedMediaTypeError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.UNSUPPORTED_MEDIA_TYPE, message);
    if (!message) {
      this.message = Message.UNSUPPORTED_MEDIA_TYPE;
    }
  }
}

export class RangeNotSatisfiableError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.RANGE_NOT_SATISFIABLE, message);
    if (!message) {
      this.message = Message.RANGE_NOT_SATISFIABLE;
    }
  }
}

export class ExpectationFailedError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.EXPECTATION_FAILED, message);
    if (!message) {
      this.message = Message.EXPECTATION_FAILED;
    }
  }
}

export class ImATeapotError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.IM_A_TEAPOT, message);
    if (!message) {
      this.message = Message.IM_A_TEAPOT;
    }
  }
}

export class MisdirectedRequestError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.MISDIRECTED_REQUEST, message);
    if (!message) {
      this.message = Message.MISDIRECTED_REQUEST;
    }
  }
}

export class UnprocessableEntityError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, message);
    if (!message) {
      this.message = Message.UNPROCESSABLE_ENTITY;
    }
  }
}

export class LockedError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.LOCKED, message);
    if (!message) {
      this.message = Message.LOCKED;
    }
  }
}

export class FailedDependencyError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.FAILED_DEPENDENCY, message);
    if (!message) {
      this.message = Message.FAILED_DEPENDENCY;
    }
  }
}

export class TooEarlyError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.TOO_EARLY, message);
    if (!message) {
      this.message = Message.TOO_EARLY;
    }
  }
}

export class UpgradeRequiredError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.UPGRADE_REQUIRED, message);
    if (!message) {
      this.message = Message.UPGRADE_REQUIRED;
    }
  }
}

export class PreconditionRequiredError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.PRECONDITION_REQUIRED, message);
    if (!message) {
      this.message = Message.PRECONDITION_REQUIRED;
    }
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.TOO_MANY_REQUESTS, message);
    if (!message) {
      this.message = Message.TOO_MANY_REQUESTS;
    }
  }
}

export class RequestHeaderFieldsTooLargeError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE, message);
    if (!message) {
      this.message = Message.REQUEST_HEADER_FIELDS_TOO_LARGE;
    }
  }
}

export class UnavailableForLegalReasonsError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS, message);
    if (!message) {
      this.message = Message.UNAVAILABLE_FOR_LEGAL_REASONS;
    }
  }
}

export class InternalServerError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    if (!message) {
      this.message = Message.INTERNAL_SERVER_ERROR;
    }
  }
}

export class NotImplementedError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.NOT_IMPLEMENTED, message);
    if (!message) {
      this.message = Message.NOT_IMPLEMENTED;
    }
  }
}

export class BadGatewayError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.BAD_GATEWAY, message);
    if (!message) {
      this.message = Message.BAD_GATEWAY;
    }
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.SERVICE_UNAVAILABLE, message);
    if (!message) {
      this.message = Message.SERVICE_UNAVAILABLE;
    }
  }
}

export class GatewayTimeoutError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.GATEWAY_TIMEOUT, message);
    if (!message) {
      this.message = Message.GATEWAY_TIMEOUT;
    }
  }
}

export class HTTPVersionNotSupportedError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, message);
    if (!message) {
      this.message = Message.HTTP_VERSION_NOT_SUPPORTED;
    }
  }
}

export class VariantAlsoNegotiatesError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.VARIANT_ALSO_NEGOTIATES, message);
    if (!message) {
      this.message = Message.VARIANT_ALSO_NEGOTIATES;
    }
  }
}

export class InsufficientStorageError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.INSUFFICIENT_STORAGE, message);
    if (!message) {
      this.message = Message.INSUFFICIENT_STORAGE;
    }
  }
}

export class LoopDetectedError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.LOOP_DETECTED, message);
    if (!message) {
      this.message = Message.LOOP_DETECTED;
    }
  }
}

export class NotExtendedError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.NOT_EXTENDED, message);
    if (!message) {
      this.message = Message.NOT_EXTENDED;
    }
  }
}

export class NetworkAuthenticationRequiredError extends ApiError {
  constructor(message?: string) {
    super(HttpStatus.NETWORK_AUTHENTICATION_REQUIRED, message);
    if (!message) {
      this.message = Message.NETWORK_AUTHENTICATION_REQUIRED;
    }
  }
}
