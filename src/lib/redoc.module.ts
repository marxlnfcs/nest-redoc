import {HttpServer, INestApplication} from "@nestjs/common";
import {RedocDocument} from "./interfaces/redoc-document.interface";
import {RedocOptions} from "./interfaces/redoc-options.interface";
import {RedocOptionsSchema} from "./schema/redoc-options.schema";
import {isBuffer, isString, normalizeUrl} from "./redoc.utils";
import {REDOC_ASSETS} from "./redoc.constants";
import {RedocFastifyAdapter} from "./adapters/redoc-fastify.adapter";
import {NestFastifyApplication} from "@nestjs/platform-fastify";
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger";
import {RedocExpressAdapter} from "./adapters/redoc-express.adapter";
import {NestExpressApplication} from "@nestjs/platform-express";
import {SwaggerDocumentOptions} from "@nestjs/swagger/dist/interfaces";
import {create as createHandlebars} from 'express-handlebars';
import {join} from "path";
import {HANDLEBARS_MAIN} from "./views/main.handlebars";
import {template} from "handlebars";

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

				// build the redoc document
				const redocDocument = this.buildDocument(redocPath, document, options);

				// render template
				const redocTemplate = await this.renderHandlebars(redocOptions);

				// get http adapter
				const httpAdapter: HttpServer = app.getHttpAdapter();

				// choose right adapter
				switch(httpAdapter?.constructor?.name){
					case 'FastifyAdapter': return resolve(await (new RedocFastifyAdapter(redocPath, app as NestFastifyApplication, redocDocument, redocOptions, redocTemplate).setup()));
					default: return resolve(await (new RedocExpressAdapter(redocPath, app as NestExpressApplication, redocDocument, redocOptions, redocTemplate).setup()));
				}

			}catch(e){
				reject(e);
			}
		});
	}

	/**
	 * Create and returns a DocumentBuilder. It's the same as doing "new DocumentBuilder()"
	 */
	public static createDocumentBuilder(): DocumentBuilder {
		return new DocumentBuilder();
	}

	/**
	 * Create and returns a Document. It's the same as doing "SwaggerModule.createDocument()"
	 */
	public static createDocument(app: INestApplication, config: Omit<OpenAPIObject, 'paths'>, options?: SwaggerDocumentOptions): OpenAPIObject {
		return SwaggerModule.createDocument(app, config, options);
	}

	/**
	 * Builds the document with all vendor extensions
	 */
	private static buildDocument(path: string, document: OpenAPIObject, options: Partial<RedocOptions>): RedocDocument {
		return Object.assign(document || {}, {
			info: Object.assign(document?.info || {}, {
				'x-logo': {
					url: isString(options?.logo?.url) ? options.logo.url : isBuffer(options?.logo?.url) ? REDOC_ASSETS.LOGO : null,
					backgroundColor: options?.logo?.backgroundColor,
					altText: options?.logo?.altText,
					href: options?.logo?.href || `/${path}`,
				},
			}),
			'x-apiGroups': options?.tagGroups || [],
		}) as any;
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

	/**
	 * Create and returns the initialized handlebars engine
	 */
	private static renderHandlebars(options: RedocOptions): Promise<string> {
		return new Promise(async (resolve, reject) => {
			try{

				// create render data
				const renderData: any = {
					data: Object.assign(options, {
						favicon: isString(options?.favicon) || isBuffer(options?.favicon),
						logo: isString(options?.logo?.url) || isBuffer(options?.logo?.url),
					}),
					partials: {

					}
				};

				// create handlebars engine
				const engine = createHandlebars({
					helpers: {
						include: async (template: Function) => await template(renderData),
						toB64Json: (data: any) => Buffer.from(JSON.stringify(data)).toString('base64'),
					}
				});

				// render html
				resolve(engine.handlebars.compile(HANDLEBARS_MAIN, {})(renderData));

			}catch(e){
				reject(e);
			}
		});
	}

}