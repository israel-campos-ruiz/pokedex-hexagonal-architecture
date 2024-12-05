import { PokemonDomain } from '../entities/Pokemon.entity';

export const mapFromInfrastructure = (data: any): PokemonDomain => {
  return new PokemonDomain({
    _id: data._id,
    name: data.name,
    no: data.no,
  });
};
