import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, bookSchema } from './schema/book.schema';
import { BookDAO } from './dao/book.dao';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Book.name, schema: bookSchema}])
  ],
  controllers: [BookController],
  providers: [BookService, BookDAO],
})

export class BooksModule {}
