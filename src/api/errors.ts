export type ApiErrorCode =
  | 'network'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'validation'
  | 'server'
  | 'unknown';

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;

  constructor(message: string, code: ApiErrorCode = 'unknown', status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }

  static fromResponse(status: number, body?: { message?: string }): ApiError {
    const message = body?.message ?? `Request failed (${status})`;
    if (status === 401) return new ApiError(message, 'unauthorized', status);
    if (status === 403) return new ApiError(message, 'forbidden', status);
    if (status === 404) return new ApiError(message, 'not_found', status);
    if (status >= 400 && status < 500) return new ApiError(message, 'validation', status);
    return new ApiError(message, 'server', status);
  }

  static offline(): ApiError {
    return new ApiError('You appear to be offline. Check your connection and try again.', 'network');
  }
}
