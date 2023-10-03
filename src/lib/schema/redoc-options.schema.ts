import {OpenAPIObject} from "@nestjs/swagger";
import * as joi from 'joi';
import {ObjectSchema} from 'joi';
import {RedocLogoOptions, RedocOptions} from "../interfaces/redoc-options.interface";
import {RedocTheme} from "../interfaces/redoc-theme.interface";

export function RedocOptionsSchema(document: OpenAPIObject): ObjectSchema<RedocOptions> {
	return joi.object<RedocOptions>().keys({
		redocVersion: joi.string().default('latest'),
		title: joi.string().optional().default(document?.info?.title || 'Swagger documentation'),
		favicon: joi.custom(value => typeof value === 'string' ? joi.string().uri() : Buffer.isBuffer(value) ? value : new Error('Only URL or Buffer allowed')).optional(),
		logo: joi.object<RedocLogoOptions>({
			url: joi.custom(value => typeof value === 'string' ? joi.string().uri() : Buffer.isBuffer(value) ? value : new Error('Only URL or Buffer allowed')).optional(),
			backgroundColor: joi.string().regex(new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')).optional(),
			altText: joi.string().optional(),
			href: joi.string().optional().uri(),
		}),
		theme: joi.any<RedocTheme>(),
		disableSearch: joi.boolean().optional().default(false),
		minCharacterLengthToInitSearch: joi.number().optional().default(3),
		expandDefaultServerVariables: joi.boolean().optional().default(false),
		expandResponses: joi.array().items(joi.string()),
		expandSingleSchemaField: joi.boolean().optional().default(false),
		hideDownloadButton: joi.boolean().optional().default(false),
		hideHostname: joi.boolean().optional().default(false),
		hideLoading: joi.boolean().optional().default(false),
		hideRequestPayloadSample: joi.boolean().optional().default(false),
		hideOneOfDescription: joi.boolean().optional().default(false),
		hideSchemaPattern: joi.boolean().optional().default(false),
		hideSchemaTitles: joi.boolean().optional().default(false),
		hideSecuritySection: joi.boolean().optional().default(false),
		hideSingleRequestSampleTab: joi.boolean().optional().default(false),
		jsonSampleExpandLevel: joi.boolean().custom(value => typeof value === 'string' || typeof value === 'number' ? value : new Error('Only string or a number allowed')).optional(),
		maxDisplayedEnumValues: joi.number().optional(),
		menuToggle: joi.boolean().optional().default(true),
		nativeScrollbars: joi.boolean().optional().default(false),
		onlyRequiredInSamples: joi.boolean().optional().default(false),
		pathInMiddlePanel: joi.boolean().optional().default(false),
		payloadSampleIdx: joi.any(),
		requiredPropsFirst: joi.boolean().optional().default(false),
		schemaExpansionLevel: joi.number().custom(value => typeof value === 'number' || value === 'all' ? value : new Error('Only a number or "all" allowed.')).default(0).optional(),
		scrollYOffset: joi.any().optional(),
		showExtensions: joi.any().optional().default(false),
		showObjectSchemaExamples: joi.boolean().optional().default(false),
		showWebhookVerb: joi.boolean().optional().default(false),
		simpleOneOfTypeLabel: joi.boolean().optional().default(false),
		sortEnumValuesAlphabetically: joi.boolean().optional().default(false),
		sortOperationsAlphabetically: joi.boolean().optional().default(false),
		sortPropsAlphabetically: joi.boolean().optional().default(false),
		sortTagsAlphabetically: joi.boolean().optional().default(false),
		untrustedDefinition: joi.boolean().optional().default(false),
		disableAutoAuthorization: joi.boolean().optional().default(false),
		tagGroups: joi.array().optional().items(
			joi.object({
				name: joi.string(),
				tags: joi.array().items(joi.string())
			})
		),
	});
}