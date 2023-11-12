import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {RedocModule} from "../src";

async function bootstrap() {

    // create app
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api');

    // create document builder
    const config = RedocModule.createDocumentBuilder();

    // create document
    const document = RedocModule.createDocument(app, config.build());

    // setup redoc
    await RedocModule.setup('/docs', app, document, {
        theme: {
            sidebar: {
                backgroundColor: '#000000',
                textColor: '#FFFFFF'
            },
        },
        auth: {
            enabled: true,
        },
        useGlobalPrefix: true,
    });

    // listen to port 3001
    await app.listen(3001);

}

bootstrap();