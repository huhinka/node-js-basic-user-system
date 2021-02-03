class GeneralError extends Error {
  constructor (message) {
    super()
    this.message = message
  }

  getCode () {
    if (this instanceof BadRequestError) {
      return 400
    } else if (this instanceof NotFoundError) {
      return 404
    } else {
      return 500
    }
  }
}

class BadRequestError extends GeneralError {}

class NotFoundError extends GeneralError {}

function handleErrors (err, req, res, next) {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message
    })
  } else {
    return res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
}

export { GeneralError, BadRequestError, NotFoundError, handleErrors }
