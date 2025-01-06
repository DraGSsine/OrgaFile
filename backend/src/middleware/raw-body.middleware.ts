import { Response } from 'express';
import { json } from 'body-parser';
import { Request } from 'express';

export interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}

export function RawBodyMiddleware() {
  return json({
    verify: (
      request: RequestWithRawBody,
      response: Response,
      buffer: Buffer,
    ) => {
      if (request.url === '/api/payment/webhook' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}
