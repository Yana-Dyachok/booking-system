import { Request } from 'express';

export type FetchEntityById<T> = (id: string) => Promise<T | undefined | null>;

export type RequestWithLoadedEntity<T> = Request & { entity: T };
