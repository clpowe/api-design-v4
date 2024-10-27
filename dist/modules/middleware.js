"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputErrors = handleInputErrors;
var express_validator_1 = require("express-validator");
function handleInputErrors(req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    }
    else {
        next();
    }
}
//# sourceMappingURL=middleware.js.map