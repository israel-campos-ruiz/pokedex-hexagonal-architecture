import * as path from 'path';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { nodemailerSchema } from 'src/config/schemas/nodemailer/nodemailer.schema';

export const nodemailerOptions: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  validationSchema: nodemailerSchema,
  envFilePath: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
};
