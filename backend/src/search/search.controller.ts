import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './search.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiQuery({
    name: 'email',
    type: String,
    required: true,
    example: 'example@gmail.com',
  })
  @ApiQuery({
    name: 'number',
    type: String,
    required: false,
    example: '221122',
  })
  async search(@Query() query: SearchDto) {
    return this.searchService.findUsers(query.email, query.number);
  }
}
