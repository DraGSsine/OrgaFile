/// <reference types="node" />
/// <reference types="connect" />
import { Request } from 'express';
export interface RequestWithRawBody extends Request {
    rawBody: Buffer;
}
export declare function RawBodyMiddleware(): import("connect").NextHandleFunction;
