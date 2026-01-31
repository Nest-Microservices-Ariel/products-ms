import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, RpcException, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port,
      }
    }
  );

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    // esta factory es para capturar los errores del ValidationPipe que rompen por ser microservicio
    // una alternativa es capturar los HttpException con un filter como en el gateway
    exceptionFactory: ( error ) => {
      return new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error
      })
    }
  }));

  await app.listen();
  logger.log(`Products microservice running on port ${ envs.port }`);
}
bootstrap();
