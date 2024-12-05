import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class GetPokemonDto {
  @ApiProperty({ description: 'pokemon name' })
  @IsString()
  name: string;
  @ApiProperty({ description: 'pokemon number' })
  @IsNumber()
  no: number;
}
