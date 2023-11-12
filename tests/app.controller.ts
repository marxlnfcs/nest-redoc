import {Controller, Get} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";

@Controller()
export class AppController {

	@Get('ping')
	@ApiTags('Tag1')
	ping(){
		return 'pong';
	}

}