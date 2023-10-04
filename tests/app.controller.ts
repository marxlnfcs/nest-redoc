import {Controller, Get} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";

@Controller('/foo/bar')
export class AppController {

	@Get('ping')
	@ApiTags('Tag1')
	ping(){}

}