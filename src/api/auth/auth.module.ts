import { AuthController } from '@/api/auth/auth.controller'
import { AuthProvider } from '@/api/auth/auth.provider'
import { AuthService } from '@/api/auth/auth.service'
import { JwtStrategy } from '@/api/auth/jwt.strategy'
import { User } from '@/api/user/user.entity'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthProvider, JwtStrategy],
})
export class AuthModule {}
