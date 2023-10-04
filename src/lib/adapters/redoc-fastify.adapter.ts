import {RedocDocument} from "../interfaces/redoc-document.interface";
import {RedocOptions} from "../interfaces/redoc-options.interface";
import {NestFastifyApplication} from "@nestjs/platform-fastify";

export class RedocFastifyAdapter {
	constructor(
		private path: string,
		private app: NestFastifyApplication,
		private document: RedocDocument,
		private options: RedocOptions,
		private template: string,
	){}

	setup(): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {
			try{
				throw new Error('Fastify is not implemented yet');
			}catch(e){
				reject(e);
			}
		});
	}
}