export interface ApplicationService<T> {
  process(data?: T, metadata?: any);
}
