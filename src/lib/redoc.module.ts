import {HttpServer, INestApplication} from "@nestjs/common";
import {RedocDocument} from "./interfaces/redoc-document.interface";
import {RedocOptions} from "./interfaces/redoc-options.interface";
import {RedocOptionsSchema} from "./schema/redoc-options.schema";
import {isBuffer, isString, normalizeUrl} from "./redoc.utils";
import {REDOC_ASSETS} from "./redoc.constants";
import {RedocFastifyAdapter} from "./adapters/redoc-fastify.adapter";
import {NestFastifyApplication} from "@nestjs/platform-fastify";
import {OpenAPIObject} from "@nestjs/swagger";
import {RedocExpressAdapter} from "./adapters/redoc-express.adapter";
import {NestExpressApplication} from "@nestjs/platform-express";

export class RedocModule {

	/**
	 * Creates the ReDoc frontend
	 * @param path - Relative path of the frontend
	 * @param app - NestApplication
	 * @param document - RedocDocument
	 * @param options - RedocOptions
	 */
	public static setup(path: string, app: INestApplication, document: OpenAPIObject, options?: Partial<RedocOptions>): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {
			try{

				// normalize the path
				const redocPath = normalizeUrl(path);

				// validate the redoc options with joi
				const redocOptions = await this.validateOptions(options || {}, document);

				// add vendor extensions
				const redocDocument = Object.assign(document || {}, {
					info: Object.assign(document?.info || {}, {
						'x-logo': {
							url: isString(options?.logo?.url) ? options.logo.url : isBuffer(options?.logo?.url) ? REDOC_ASSETS.LOGO : null,
							backgroundColor: options?.logo?.backgroundColor,
							altText: options?.logo?.altText,
							href: options?.logo?.href || `/${redocPath}`,
						},
					}),
					'x-apiGroups': options?.tagGroups || [],
				}) as unknown as RedocDocument;

				// get http adapter
				const httpAdapter: HttpServer = app.getHttpAdapter();

				// choose right adapter
				switch(httpAdapter?.constructor?.name){
					case 'FastifyAdapter': return await (new RedocFastifyAdapter(redocPath, app as NestFastifyApplication, redocDocument, redocOptions).setup());
					default: return await (new RedocExpressAdapter(redocPath, app as NestExpressApplication, redocDocument, redocOptions).setup());
				}

			}catch(e){
				reject(e);
			}
		});
	}

	/**
	 * Validate the redoc options
	 */
	private static validateOptions(options: Partial<RedocOptions>, document: OpenAPIObject): Promise<RedocOptions> {
		return new Promise<RedocOptions>(async (resolve, reject) => {
			try{
				resolve(await RedocOptionsSchema(document).validateAsync(options) as any);
			}catch(e){
				reject(new TypeError(e.message));
			}
		});
	}

}