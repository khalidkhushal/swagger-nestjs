import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/secrets';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Books Inventory')
    .setDescription('Books Inventory APIs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(`Server is running on port: ${PORT}`)
}

bootstrap();
