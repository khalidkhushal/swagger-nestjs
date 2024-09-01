import { ApiProperty } from "@nestjs/swagger";

export class BookResponse  {
    @ApiProperty({example: "66d4c7ec074a1f213cd48fc2"})
    id: string;

    @ApiProperty({example: "Book"})
    name: string;

    @ApiProperty({example: "This is Book"})
    description: string;

    @ApiProperty({example: new Date()})
    updatedAt: Date;

    @ApiProperty({example: new Date()})
    createdAt: Date;
}