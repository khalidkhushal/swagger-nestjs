import { Document, FilterQuery, Model } from "mongoose";
import { CustomError } from "./customeError";
import { Logger } from "@nestjs/common";

type DTOCreate<T> = Pick<T, keyof T>;

export abstract class BaseDAO<T extends Document, U> {
  protected constructor(protected readonly model: Model<T>) { }

  async findById(id: string): Promise<T | null> {

    const document = await this.model.findById(id).select("-__v").lean().exec();
    if (!document) {
        // we can create enums for status code
      throw new CustomError(`Document with id ${id}not found`, 404);
    }

    document.id = document._id.toString();
    delete document._id;
    return document as T;
  }

  async create(data: DTOCreate<U>): Promise<T> {
    try {

    const res = await this.model.create(data);
    const { _id, __v, ...result } = res.toObject();
    result.id = _id.toString();
    return result as T;

    } catch(e) {
      Logger.error(e)
      throw new CustomError(e.message, 400);
    }
    
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const updatedData = {
      ...data,
      updatedAt: new Date(),
    };

    const document = await this.model
      .findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true, projection: { __v: 0 }, lean: true }
      )
      .exec();

    if (!document) {
      throw new CustomError(`Document with ID ${id} not found`, 404);
    }

    // Convert _id to id
    document.id = document._id.toString();
    delete document._id;

    return document;
  }

  async find(filter: FilterQuery<T>, selectFields?: (keyof T | '*')[], page: number = 1, perPage: number = 10, sort = {}): Promise<T[]> {

    if (filter.hasOwnProperty('id')) {
      filter['_id'] = filter['id'];
      delete filter['id'];
    }

    let fieldsToSelect: string[] = ['id', 'createdAt', 'updatedAt'];

    if (selectFields && selectFields.length > 0) {
      if (selectFields.includes('*')) {
        fieldsToSelect = Object.keys(this.model.schema.paths);
      } else {
        fieldsToSelect = [...fieldsToSelect, ...(selectFields as string[])];
      }
    }

    const total = await this.model.countDocuments(filter).exec();
    const lastPage = Math.ceil(total / perPage);

    const data = await this.model
      .find(filter)
      .select(fieldsToSelect.join(' '))
      .select('-__v')
      .sort(sort)
      .lean()
      .exec();

    // Map the _id field to id
    const mappedData = data.map((item: any) => {
      const { _id, ...rest } = item;
      return { id: _id.toString(), ...rest };
    });

    // can implement pagination

    // return {
    //   data: mappedData,
    //   pagination: {},
    // };

    return mappedData as unknown as T[]
  }

  async delete(Id: string): Promise<string> {
    const existing = await this.model.findById(Id);
    const result = await existing.remove();

    return Id;
  }


}