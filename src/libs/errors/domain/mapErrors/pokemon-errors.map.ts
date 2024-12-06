import { HttpStatus } from '@nestjs/common';
import { PokemonErrors } from '../enums/pokemon-errros.enum';

export const PokemonErrorsMap = {
  [PokemonErrors.REPEATED_DATA]: {
    code: 11000,
    statusCode: HttpStatus.CONFLICT,
    message: 'Duplicate data canot be inserted ',
  },
};
