interface CommonApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  userDetail?: object;
  error?: string;
}
