import {OpenAPIObject} from "@nestjs/swagger";
import {RedocLogoOptions, RedocTagGroupOptions} from "./redoc-options.interface";
import {DeepPartial} from "../redoc.utils";

export interface RedocDocument extends DeepPartial<OpenAPIObject> {
	info: OpenAPIObject['info'] & { 'x-logo'?: RedocLogoOptions };
	'x-tagGroups': RedocTagGroupOptions[];
}