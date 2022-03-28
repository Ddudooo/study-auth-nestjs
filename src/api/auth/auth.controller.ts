import { AuthService } from '@/api/auth/auth.service'
import { Public } from '@/api/auth/decorators/public.decorator'
import { LoginDto } from '@/api/auth/dto/login.dto'
import { RegisterDto } from '@/api/auth/dto/register.dto'
import { User } from '@/api/user/user.entity'
import { Body, Controller, Post, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<User | never> {
    return this.service.register(body)
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto): Promise<string | never> {
    return this.service.login(body)
  }

  @Post('refresh')
  async refresh(@Req() { user }: Request): Promise<string | never> {
    return this.service.refreshToken(<User>user)
  }
}
