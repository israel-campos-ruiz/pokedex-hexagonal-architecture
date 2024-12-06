import { Db, Collection, ObjectId } from 'mongodb';
import { CreatePokemonDto } from 'src/pokemons/domain/dto/create-pokemon.dto';

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
  entity: string | number,
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
