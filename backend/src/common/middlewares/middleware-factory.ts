import { IsExistMiddleware } from './is-exist.middleware';

export const createExistMiddleware = <T>(
	fetchFn: (id: string) => Promise<T | null | undefined>,
) => {
	return new IsExistMiddleware(fetchFn).handle;
};
