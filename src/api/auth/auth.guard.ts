import { User } from '@/api/user/user.entity'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard, IAuthGuard } from '@nestjs/passport'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  handleRequest(err: unknown, user: User): any {
    return user
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)

    const { user }: Request = context.switchToHttp().getRequest()

    return !!user
  }
}
