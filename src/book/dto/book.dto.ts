import { BaseDTO } from 'src/common/base.dto'

import { IsNotEmpty, IsString } from 'class-validator';

export class BookDTO extends BaseDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}



