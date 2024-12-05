import { MongooseModule } from '@nestjs/mongoose';
import { DataBaseConfigType } from '../types/configDataBaseType';

type ConfigLoader = {
  database: DataBaseConfigType;
};
// TODO put this in a env file
export const configLoader = (): ConfigLoader => ({
  database: {
    password: 'example',
    username: 'root',
    mongoDBConnection: () => {
      const uri = `mongodb://root:example@localhost:27017/pokedex-mongo?authSource=admin`;
      return MongooseModule.forRoot(uri);
    },
  },
});
