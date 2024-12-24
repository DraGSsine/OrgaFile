import { Request } from 'express';
export interface RequestWithRawBody extends Request {
    rawBody: Buffer;
}
export declare function RawBodyMiddleware(): any;
