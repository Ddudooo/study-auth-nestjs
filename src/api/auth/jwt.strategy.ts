import { AuthProvider } from '@/api/auth/auth.provider'
import { User } from '@/api/user/user.entity'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthProvider)
    private readonly provider: AuthProvider,
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_KEY'),
      ignoreExpiration: true,
    })
  }

  private validate(payload: string): Promise<User | never> {
    return this.provider.validateUser(payload)
  }
}
