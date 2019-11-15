const { CustomError } = require('../lib/errorHandler');

class UserNoExist extends CustomError {
  constructor(message) {
    let _message = message || "Product doesn't existe. No complite";
    super(_message,"404",'ProductNoExist');
  }
}

class InvalidAuthentication extends CustomError {
  constructor(message) {
    let _message = message || "Invalid authentication";
    super(_message,"401",'InvalidAuthentication');
  }
}

class InvalidCode extends CustomError {
  constructor(message) {
    let _message = message || "Invalid code";
    super(_message,"401",'InvalidCode');
  }
}

class UsernameAlreadyExists extends CustomError {
  constructor(message) {
    let _message = message || "Username already exists";
    super(_message,"409",'ProductNoExist');
  }
}


class UnauthorizedToModify extends CustomError {
  constructor(message) {
    let _message = message || "Unauthorized to modify";
    super(_message,"401",'UnauthorizedToModify');
  }
}

module.exports = {
  UsernameAlreadyExists,
  InvalidAuthentication,
  UserNoExist,
  UnauthorizedToModify,
  InvalidCode
}
