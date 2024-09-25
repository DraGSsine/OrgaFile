"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const options = {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { rawBody: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    app.enableCors(options);
    await app.listen(9010);
}
bootstrap();
//# sourceMappingURL=main.js.map