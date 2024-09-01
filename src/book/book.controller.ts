import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './dto/book.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookResponse } from './dto/book.response';

@ApiTags("books")
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOkResponse({type: BookResponse})
  @Post()
  async create(@Body() book: BookDTO): Promise<BookDTO> {
    return await this.bookService.create(book);
  }

  @Get()
  @ApiOkResponse({type: [BookResponse]})
  // can have page and perpage in query for pagination
  async findAll() {
    return await this.bookService.findAll();
  }

  @ApiOkResponse({type: BookResponse})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookService.findOne(id);
  }

  @ApiOkResponse({type: BookResponse})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() book: BookDTO) {
    return await this.bookService.update(id, book);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bookService.remove(id);
  }
}
