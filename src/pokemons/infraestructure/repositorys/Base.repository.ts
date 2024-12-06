/* eslint-disable @typescript-eslint/no-unused-vars */
export interface BaseRepository<T> {
  create?(entity: T): Promise<T>;
  findOne?(entity: any): Promise<T>;
}
