const { CustomError } = require('../lib/errorHandler');

class ProductNoExist extends CustomError {
  constructor(message) {
    let _message = message || "Product doesn't exist.";
    super(_message,"404",'ProductNoExist');
  }
}

class OwnerNoExist extends CustomError {
  constructor(message) {
    let _message = message || "Owner doesn't existe";
    super(_message,"404",'OwnerNoExist');
  }
}

class UnauthorizedToModify extends CustomError {
  constructor(message) {
    let _message = message || "Unauthorized to modify";
    super(_message,"401",'UnauthorizedToModify');
  }
}

class UnauthorizedToDelete extends CustomError {
  constructor(message) {
    let _message = message || "Unauthorized to delete";
    super(_message,"401",'UnauthorizedToDelete');
  }
}

module.exports = {
  ProductNoExist,
  OwnerNoExist,
  UnauthorizedToModify,
  UnauthorizedToDelete
}
