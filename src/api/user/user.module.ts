import { AuthModule } from '@/api/auth/auth.module'
import { UserController } from '@/api/user/user.controller'
import { User } from '@/api/user/user.entity'
import { UserService } from '@/api/user/user.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
