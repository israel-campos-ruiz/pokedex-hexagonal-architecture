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
