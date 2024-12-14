export interface BaseAuthRepository<T> {
  signLocal?(params: T): Promise<T>;
  signOtp?(params: T): Promise<T>;
  createOtp?(params: T): Promise<T>;
  findByEmail?(params: T): Promise<T>;
}
