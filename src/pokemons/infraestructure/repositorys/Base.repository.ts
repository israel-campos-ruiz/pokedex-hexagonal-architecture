/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class BaseRepository<T> {
  abstract create(_entity: T): Promise<T>;
}
