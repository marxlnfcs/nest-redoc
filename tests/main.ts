import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {RedocModule} from "../src";

async function bootstrap() {

    // create app
    const app = await NestFactory.create(AppModule);

    // create document builder
    const config = RedocModule.createDocumentBuilder();

    // create document
    const document = RedocModule.createDocument(app, config.build());

    // setup redoc
    await RedocModule.setup('api', app, document, {
        theme: {
            sidebar: {
                backgroundColor: '#000000',
                textColor: '#FFFFFF'
            },
        },
        auth: {
            enabled: true,
            users: [
                { username: 'user1', password: 'pass1' },
                { username: 'user2', password: 'pass2' },
            ]
        }
    });

    // listen to port 3001
    await app.listen(3001);

}

bootstrap();