import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma-orm';
import { UserController } from './user.controller';
import { createExistMiddleware } from '@/common/middlewares/middleware-factory';

@Module({
	imports: [PrismaModule],
	providers: [UserService],
	exports: [UserService],
	controllers: [UserController],
})
export class UserModule implements NestModule {
	constructor(private readonly userService: UserService) {}

	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				createExistMiddleware((id: string) =>
					this.userService.findById(id),
				),
			)
			.forRoutes('user/:id');
	}
}
