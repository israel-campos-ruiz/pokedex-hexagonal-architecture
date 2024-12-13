export interface BaseAuthRepository<T> {
  signLocal?(params: T): Promise<T>;
  signOtp?(params: T): Promise<T>;
}
