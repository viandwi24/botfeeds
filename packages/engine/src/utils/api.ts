import type { Response } from "express"

export namespace ApiResponse {
  export const Custom = (
    res: Response,
    httpCode: number = 200,
    ok: boolean,
    message: string,
    data?: any|undefined,
    errors?: any[]|undefined,
  ) => {
    if (errors) {
      return res.status(httpCode).json({
        ok,
        message,
        errors,
      })
    } else {
      return res.status(httpCode).json({
        ok,
        message,
        data,
      })
    }
  }
}