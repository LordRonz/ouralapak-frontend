export type APIResponse<T = string> = {
  success: boolean;
  message: string[];
  data?: T;
};

export default APIResponse;
