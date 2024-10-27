"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middleware_1 = require("./modules/middleware");
var products_1 = require("./handlers/products");
var updates_1 = require("./handlers/updates");
var router = (0, express_1.Router)();
// Product
router.get('/product', products_1.getProducts);
router.get('/product/:id', products_1.getOneProduct);
router.put('/product/:id', (0, express_validator_1.body)('name').isString(), middleware_1.handleInputErrors, products_1.updateProduct);
router.post('/product', (0, express_validator_1.body)('name').isString(), middleware_1.handleInputErrors, products_1.createProduct);
router.delete('/product/:id', products_1.deleteProduct);
// Update
router.get('/update', updates_1.getUpdates);
router.get('/update/:id', updates_1.getOneUpdate);
router.put('/update/:id', (0, express_validator_1.body)('title').optional(), (0, express_validator_1.body)('body').optional(), (0, express_validator_1.body)('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED', 'ARCHIVE']), (0, express_validator_1.body)('version').optional(), updates_1.updateUpdate);
router.post('/update', (0, express_validator_1.body)('title').exists().isString(), (0, express_validator_1.body)('body').exists().isString(), (0, express_validator_1.body)('productId').exists().isString(), updates_1.createUpdate);
router.delete('/update/:id', updates_1.deleteUpdate);
// Update Point
router.get('/updatepoint', function () { });
router.get('/updatepoint/:id', function () { });
router.put('/updatepoint/:id', (0, express_validator_1.body)('name').optional().isString(), (0, express_validator_1.body)('description').optional().isString(), function () { });
router.post('/updatepoint', (0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('description').isString(), (0, express_validator_1.body)('updateId').exists().isString(), function () { });
router.delete('/updatepoint/:id', function () { });
exports.default = router;
//# sourceMappingURL=router.js.map