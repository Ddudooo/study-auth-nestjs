import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { TypeOrmConfigService } from '@/config/typeOrmConfig.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
