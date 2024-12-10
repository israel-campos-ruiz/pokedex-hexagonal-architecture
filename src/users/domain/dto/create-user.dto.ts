import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'this is a required field' })
  @IsString()
  name: string;
  @ApiProperty({ description: 'this is a required field' })
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
  @ApiProperty({
    description: 'Array of Pokémon IDs (Pokédex numbers)',
    example: [1, 25, 150],
  })
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @IsPositive()
  @IsOptional()
  pokemon: any[];
}
