import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  id: string;

  @ApiProperty({ examples: ['product A', 'product b'] })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '3.00' })
  @IsString()
  @IsNotEmpty()
  price: string;
}
