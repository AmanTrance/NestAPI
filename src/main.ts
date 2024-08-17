import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { databaseManager } from './utils/database';

async function bootstrap() {
  try {
    await databaseManager.initialize();
  } catch(e) {
    console.error("DataBase Not Connected: ", e);
    return;
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
