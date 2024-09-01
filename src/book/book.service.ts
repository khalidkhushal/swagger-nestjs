import { Inject, Injectable } from '@nestjs/common';
import { BookDTO } from './dto/book.dto';
import { BookDAO } from './dao/book.dao';

@Injectable()
export class BookService {

  constructor(@Inject() private dao: BookDAO) {}

  async create(book: BookDTO): Promise<BookDTO> {
    const create = await this.dao.create(book)
    return create
  }

  async findAll(): Promise<BookDTO[]> {
    return await this.dao.find({},["*"]);
  }

  async findOne(id: string): Promise<BookDTO> {
    return await this.dao.findById(id)
  }

  async update(id: string, book: Partial<BookDTO>) {
    return await this.dao.update(id, { ...book })
  }

  async remove(id: string) {
    return await this.dao.delete(id)
  }
}
