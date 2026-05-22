import type { Request } from 'express';

// This gets exported as a type.
// Use this with: import type { JWTPayload } from '/path/to/file'
export interface JWTPayload {
    userId: string;
}

export interface AuthRequest extends Request {
    user?: JWTPayload;
}
