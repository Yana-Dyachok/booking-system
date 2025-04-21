import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const status =
			exception instanceof HttpException ? exception.getStatus() : 500;

		const errorResponse = {
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message:
				exception instanceof HttpException
					? exception.message
					: 'Internal server error',
		};

		console.error('Exception:', exception);

		response.status(status).json(errorResponse);
	}
}
