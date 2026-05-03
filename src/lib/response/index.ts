export function BaseResponse<T>(
  statusCode?: number,
  message?: string,
  data?: T
) {
  return {
    data,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}
