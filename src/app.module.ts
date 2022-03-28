import { ApiModule } from '@/api/api.module'
import { JwtAuthGuard } from '@/api/auth/auth.guard'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { TypeOrmConfigService } from '@/config/typeOrmConfig.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
