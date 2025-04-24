import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '@nestjs/common';
import { FetchEntityById, RequestWithLoadedEntity } from '../types/types';

export class IsExistMiddleware<T> {
	constructor(private readonly fetchEntityById: FetchEntityById<T>) {}

	handle = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const { id } = req.params;
		console.log('Received ID:', id);
		const isUUID =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
				id,
			);
		console.log('Is valid UUID:', isUUID);
		if (!isUUID) return next();
		if (!id)
			return next(
				new NotFoundException('Id parameter is missing in request.'),
			);
		const entity = await this.fetchEntityById(id);
		console.log('Fetched entity:', entity);
		if (!entity) {
			console.log(`Resource with id ${id} not found`);
			return next(
				new NotFoundException(`Resource with id ${id} not found`),
			);
		}
		(req as RequestWithLoadedEntity<T>).entity = entity;
		return next();
	};
}
