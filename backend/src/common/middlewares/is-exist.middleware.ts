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

		if (!id) {
			return next(
				new NotFoundException('Id parameter is missing in request.'),
			);
		}

		const entity = await this.fetchEntityById(id);

		if (!entity) {
			return next(
				new NotFoundException(`Resource with id ${id} not found`),
			);
		}

		(req as RequestWithLoadedEntity<T>).entity = entity;

		return next();
	};
}
