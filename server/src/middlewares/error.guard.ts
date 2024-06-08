interface ErrorResponse {
  status: number;
  message: string;
}

const errorMap: Record<string, ErrorResponse> = {
  USER_NOT_CREATED: { status: 400, message: "User not created" },
  USER_NOT_FOUND: { status: 400, message: "User not found" },
  INVALID_PASSWORD: { status: 400, message: "Invalid password" },
  USER_ALREADY_EXISTS: { status: 400, message: "User already exists" },
  UNAUTHORIZED: { status: 401, message: "Unauthorized" },
  FORBIDDEN: { status: 403, message: "Forbidden" },
  NOT_FOUND: { status: 404, message: "Not found" },
  INTERNAL_SERVER_ERROR: { status: 500, message: "Internal server error" },
  STOCK_NOT_FOUND: { status: 404, message: "Stock not found" },
};

export const getErrorResponse = (errorCode: string): ErrorResponse =>
  errorMap[errorCode] || { status: 500, message: "Unknown error" };
