import { Prop } from "@nestjs/mongoose";

export class BaseSchema {
  @Prop()
  id?: string; // Unique identifier for the document

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date; // Date when the document was created

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date; // Date when the document was last updated
}