import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function start(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api');

    app.enableCors();

    const PORT = process.env.PORT || 5000;

    await app.listen(PORT, () => console.log(`Server is started on PORT: ${PORT}`));
  } catch (e) {
    console.error(e);
  }
}

start();
