import { errorMiddleware } from "../src/middleware/error-middleware";
import { ResponseError } from "../src/error/response-error";

describe("errorMiddleware", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    return res;
  };

  it("should handle a ResponseError and set status and message accordingly", async () => {
    const mockRequest = {};
    const mockNext = jest.fn();

    const responseError = new ResponseError(404, "Not Found");

    const res = mockResponse();

    await errorMiddleware(responseError, mockRequest, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Not Found",
    });
    expect(res.end).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should handle an arbitrary error and set status to 500", async () => {
    const mockRequest = {};
    const mockNext = jest.fn();

    const arbitraryError = new Error("Some error");

    const res = mockResponse();

    await errorMiddleware(arbitraryError, mockRequest, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: "Some error",
    });
    expect(res.end).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should pass the error through if no error is provided", async () => {
    const mockRequest = {};
    const mockNext = jest.fn();

    const res = mockResponse();

    await errorMiddleware(null, mockRequest, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.end).not.toHaveBeenCalled();
  });
});
