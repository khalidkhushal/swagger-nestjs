import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { BaseSchema } from 'src/common/base.schema'
import { BookDTO } from '../dto/book.dto'
import { Document } from 'mongoose'

@Schema()
export class Book extends BaseSchema implements BookDTO {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    description: string
}

export type BookDocument = Book & Document

export const bookSchema = SchemaFactory.createForClass(Book)