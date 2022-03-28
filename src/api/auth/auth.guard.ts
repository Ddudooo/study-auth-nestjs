import { User } from '@/api/user/user.entity'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard, IAuthGuard } from '@nestjs/passport'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard
  extends AuthGuard('jwt')
  implements IAuthGuard, CanActivate
{
  constructor(private reflector: Reflector) {
    super()
  }

  handleRequest(err: unknown, user: User): any {
    return user
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    )
    if (isPublic) {
      return true
    }
    await super.canActivate(context)

    const { user }: Request = context.switchToHttp().getRequest()

    return !!user
  }
}
