/* eslint-disable @typescript-eslint/no-unused-vars */
export interface BaseRepository<T> {
  create?(_entity: T): Promise<T>;
}
