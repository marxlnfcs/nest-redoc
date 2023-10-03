import {OpenAPIObject} from "@nestjs/swagger";
import {RedocLogoOptions, RedocTagGroupOptions} from "./redoc-options.interface";

export interface RedocDocument extends Partial<OpenAPIObject> {
	info: OpenAPIObject['info'] & { 'x-logo'?: RedocLogoOptions };
	'x-tagGroups': RedocTagGroupOptions[];
}