export function BaseResponse<T>(
  statusCode?: number,
  message?: string,
  data?: T,
  total?: number
) {
  return {
    data,
    total,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}
