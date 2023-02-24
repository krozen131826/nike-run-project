export interface ServiceResponseInterface<T> {
  data: T;
  success: boolean;
  info: string;
}
