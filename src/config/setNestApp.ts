import { INestApplication, ValidationPipe } from '@nestjs/common'

export function setNestApp<T extends INestApplication>(app: T): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
}
