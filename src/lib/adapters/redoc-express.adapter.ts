import {NestExpressApplication} from "@nestjs/platform-express";
import {RedocDocument} from "../interfaces/redoc-document.interface";
import {RedocOptions} from "../interfaces/redoc-options.interface";
import {joinUrl, sendHttpAsset} from "../redoc.utils";
import {Request, Response} from "express";
import {REDOC_URLS} from "../redoc.constants";
import * as expressBasicAuth from "express-basic-auth";

/** @internal */
export class RedocExpressAdapter {
	constructor(
		private path: string,
		private app: NestExpressApplication,
		private document: RedocDocument,
		private options: RedocOptions,
		private html: string,
	){}

	setup(): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {
			try{

				// serve frontend
				this.app.getHttpAdapter().get(this.url(), async (request: Request, response: Response) => {
					if(await this.authenticate(request, response)){

						// set headers
						response.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; child-src * 'unsafe-inline' 'unsafe-eval' blob:; worker-src * 'unsafe-inline' 'unsafe-eval' blob:; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';");
						response.setHeader('Content-Type', 'text/html');

						// send template
						response.end(this.html);

					}
				});

				// serve definitions
				sendHttpAsset(this.app.getHttpAdapter(), this.url(REDOC_URLS.DEFINITIONS), this.document);

				// serve other assets
				sendHttpAsset(this.app.getHttpAdapter(), this.url(REDOC_URLS.LOGO), this.options?.logo?.url);
				sendHttpAsset(this.app.getHttpAdapter(), this.url(REDOC_URLS.FAVICON), this.options?.favicon);

				// done
				resolve();

			}catch(e){
				reject(e);
			}
		});
	}

	private authenticate(request: Request, response: Response): Promise<boolean> {
		return new Promise<boolean>(async (resolve) => {

			// skip if the authentication is disabled
			if(!this.options?.auth?.enabled){
				return resolve(true);
			}

			// skip if no users are defined
			if(!Array.isArray(this.options?.auth?.users) || this.options?.auth?.users.length <= 0){
				return resolve(true);
			}

			// convert array of users to object of users to use with the expressBasicAuth library
			const users: any = {};
			this.options.auth.users.map(i => users[i.username] = i.password);

			// create middleware for the authorization
			const middleware = expressBasicAuth({
				users: users,
				challenge: true,
				unauthorizedResponse: () => resolve(false),
			});

			// run middleware
			middleware(request, response, () => resolve(true));

		});
	}

	private url(...parts: string[]) {
		return '/' + joinUrl(this.path, ...parts);
	}

}