import { AppModule } from '@/app.module'
import { setNestApp } from '@/config/setNestApp'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setNestApp(app)

  await app.listen(process.env.APPLICATION_PORT || 3000)
}

bootstrap()
