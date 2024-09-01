import { BaseDAO } from "src/common/base.dao"
import { Book, BookDocument } from "../schema/book.schema";
import { BookDTO } from "../dto/book.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class BookDAO extends BaseDAO< BookDocument, BookDTO> {
    constructor(@InjectModel(Book.name) model: Model<BookDocument>) {
        super(model)
    }

    async getAll(filters: Partial<BookDTO>): Promise<BookDocument[]> {
        const result = await this.find({...filters})
        return result
    }
}