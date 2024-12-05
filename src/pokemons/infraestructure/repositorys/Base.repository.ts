/* eslint-disable @typescript-eslint/no-unused-vars */
export class BaseRepository<T> {
  create(entity: T): Promise<T> {
    throw new Error('method not implemented');
  }
}
