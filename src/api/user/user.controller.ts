import { UserService } from '@/api/user/user.service'
import { Controller, Inject } from '@nestjs/common'

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly service: UserService,
  ) {}
}
