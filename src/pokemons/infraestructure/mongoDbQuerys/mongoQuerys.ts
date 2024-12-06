import { HttpStatus } from '@nestjs/common';
import { Db, Collection, ObjectId } from 'mongodb';
import { CreatePokemonDto } from 'src/pokemons/domain/dto/create-pokemon.dto';
import { PokemonDomain } from 'src/pokemons/domain/entities/Pokemon.domain';

export const createPokemonQuery = async (
  db: Db,
  entity: CreatePokemonDto,
): Promise<{
  name: string;
  no: number;
  _id: ObjectId;
}> => {
  const pokeCollection: Collection = db.collection('pokemons');
  const pokemon = await pokeCollection.insertOne(entity);

  return {
    _id: pokemon.insertedId,
    ...entity,
  };
};

export const findPokemonByDifferentParams = async (
  db: Db,
  entity: ObjectId | string | number,
) => {
  const pokeCollection: Collection = db.collection('pokemons');
  const query = {
    $or: [
      ObjectId.isValid(entity) ? { _id: new ObjectId(entity) } : null,
      typeof entity === 'string'
        ? { name: { $regex: entity, $options: 'i' } }
        : null,
      typeof entity === 'number' || !isNaN(+entity) ? { no: +entity } : null,
    ].filter(Boolean),
  };

  const findPokemon = await pokeCollection.find(query).toArray();
  return findPokemon;
};
// TODO make a pagination
export const findAllPokemon = async (db: Db) => {
  const pokeCollection: Collection = db.collection('pokemons');
  return await pokeCollection.find({}).toArray();
};

export const updateOnePokemon = async (
  db: Db,
  entity: PokemonDomain,
  id: string,
) => {
  const pokeCollection: Collection = db.collection('pokemons');
  const setQuery = Object.entries(entity).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );
  await pokeCollection.updateOne({ _id: new ObjectId(id) }, { $set: setQuery });
  return {
    status: HttpStatus.ACCEPTED,
    message: `pokemon updated correctly`,
  };
};

export const deleteOnePokemon = (db: Db, id: string) => {
  const pokeCollection: Collection = db.collection('pokemons');
  return pokeCollection.deleteOne({ _id: new ObjectId(id) });
};
