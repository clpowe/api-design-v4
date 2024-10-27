"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./modules/auth");
var users_1 = require("./handlers/users");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', function (_, res) {
    res.status(200);
    res.json({ message: 'hello' });
});
app.use('/api', auth_1.protect, router_1.default);
app.post('/user', users_1.createNewUser);
app.post('/signin', users_1.signin);
app.use(function (err, req, res, next) {
    if (err.type === 'auth') {
        res.status(401);
        res.json({ message: 'unauthorized' });
    }
    else if (err.type === 'input') {
        res.status(400);
        res.json({ message: 'invalid input' });
    }
    else {
        res.status(500);
        res.json({ message: 'oops thats on us' });
    }
});
exports.default = app;
//# sourceMappingURL=server.js.map