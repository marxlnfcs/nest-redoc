import {NestExpressApplication} from "@nestjs/platform-express";
import {RedocDocument} from "../interfaces/redoc-document.interface";
import {RedocOptions} from "../interfaces/redoc-options.interface";
import {joinUrl} from "../redoc.utils";
import { create as createHandlebars } from 'express-handlebars';

export class RedocExpressAdapter {
	constructor(
		private path: string,
		private app: NestExpressApplication,
		private document: RedocDocument,
		private options: RedocOptions,
		private template: string,
	){}

	setup(): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {
			try{

				// create handlebars engine
				const engine = createHandlebars({
					helpers: {
						toB64Json: (data: any) => Buffer.from(JSON.stringify(data)).toString('base64'),
					}
				});



				// done
				resolve();

			}catch(e){
				reject(e);
			}
		});
	}

	private url(...parts: string[]) {
		return joinUrl(this.path, ...parts);
	}

	private get adapter() {
		return this.app.getHttpAdapter();
	}
}