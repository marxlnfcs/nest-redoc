import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {RedocModule} from "../src/lib/redoc.module";

async function bootstrap() {

    // create app
    const app = await NestFactory.create(AppModule);

    // create document builder
    const config = RedocModule.createDocumentBuilder();

    // create document
    const document = RedocModule.createDocument(app, config.build());

    // setup redoc
    await RedocModule.setup('api', app, document);

    // listen to port 3001
    await app.listen(3001);

}

bootstrap();