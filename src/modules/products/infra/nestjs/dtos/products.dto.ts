import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({ description: 'Product name', example: 'Apple' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Days to expiration',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  daysExpiration: number;
}
