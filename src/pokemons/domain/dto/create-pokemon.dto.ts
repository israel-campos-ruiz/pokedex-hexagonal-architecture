import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, Min } from 'class-validator';
export class CreatePokemonDto {
  @ApiProperty({ description: 'this is a required field' })
  @IsString()
  name: string;
  @ApiProperty({ description: 'this is a required field' })
  @IsNumber()
  @IsPositive()
  @Min(1)
  no: number;
}
