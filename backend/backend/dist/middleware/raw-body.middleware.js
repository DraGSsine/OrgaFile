"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawBodyMiddleware = RawBodyMiddleware;
const body_parser_1 = require("body-parser");
function RawBodyMiddleware() {
    return (0, body_parser_1.json)({
        verify: (request, response, buffer) => {
            if (request.url === '/api/payment/webhook' && Buffer.isBuffer(buffer)) {
                console.log('body rawed');
                request.rawBody = Buffer.from(buffer);
            }
            return true;
        },
    });
}
//# sourceMappingURL=raw-body.middleware.js.map