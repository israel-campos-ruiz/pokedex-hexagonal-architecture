/* eslint-disable @typescript-eslint/no-unused-vars */
export interface BaseRepository<T> {
  create?(entity: T): Promise<T>;
  findOne?(entity: any): Promise<T>;
  findAll?(): Promise<T[]>;
  updateOne?(entity: T, id: any): Promise<T>;
  deleteOne?(entity: any): Promise<T>;
}
