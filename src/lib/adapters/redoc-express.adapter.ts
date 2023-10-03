import {NestExpressApplication} from "@nestjs/platform-express";
import {RedocDocument} from "../interfaces/redoc-document.interface";
import {RedocOptions} from "../interfaces/redoc-options.interface";
import {normalizeUrl} from "../redoc.utils";

export class RedocExpressAdapter {
	constructor(
		private path: string,
		private app: NestExpressApplication,
		private document: RedocDocument,
		private options: RedocOptions,
	){}

	setup(): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {
			try{

				// get express adapter
				const httpAdapter = this.app.getHttpAdapter();

				// normalize the path
				this.path = normalizeUrl(this.path);

			}catch(e){
				reject(e);
			}
		});
	}
}