class ApplicationException {
  error: { code: number; message: string };
  message: string;

  constructor(code: number, message: string) {
    this.error = { code, message };
    this.message = message;
  }
}

const ErrorCodes = {
  BAD_REQUEST: { code: 400, message: "BAD_REQUEST" },
  NOT_FOUND: { code: 404, message: "NOT_FOUND" },
  FORBIDDEN: { code: 403, message: "FORBIDDEN" },
  UNAUTHORIZED: { code: 401, message: "UNAUTHORIZED" },
  VALIDATION_FAILURE: { code: 406, message: "VALIDATION_FAILURE" },
  METHOD_NOT_ALLOWED: { code: 405, message: "METHOD_NOT_ALLOWED" },
  PRECONDITION_FAILED: { code: 412, message: "PRECONDITION_FAILED" },
  CONFLICT: { code: 409, message: "CONFLICT" },
};

const errorUtils = {
  is: function (error: ApplicationException, errorCode?: number) {
    return (
      error instanceof ApplicationException &&
      (errorCode === undefined || error.error.code === errorCode)
    );
  },
  new: function (code: number, message: string) {
    return new ApplicationException(code, message);
  },
  errorHandler: function (error: ApplicationException, response: any) {
    if (error instanceof ApplicationException) {
      response
        .status(error.error.code)
        .send(error.message || error.error.message);
    } else {
      console.error(error || error);
      response.sendStatus(500);
    }
  },
};

export { ApplicationException, ErrorCodes, errorUtils };
