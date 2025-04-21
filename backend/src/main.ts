import { NestFactory } from '@nestjs/core';
import { CustomExceptionFilter } from './common/filters';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const port = configService.get<number>('config.port') ?? 4000;
	app.enableCors({
		origin: '*',
		allowedHeaders: ['Content-Type', 'Authorization'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		credentials: true,
	});
	app.useGlobalFilters(new CustomExceptionFilter());
	app.listen(port, '0.0.0.0')
		.then(() =>
			console.log(`Application is running on: http://localhost:${port}`),
		)
		.catch((err) => {
			console.error('Failed to start server:', err);
			process.exit(1);
		});
}

bootstrap();
