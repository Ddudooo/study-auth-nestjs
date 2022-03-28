import { UpdateUserDto } from '@/api/user/dto/updateUser.dto'
import { User } from '@/api/user/user.entity'
import { UserService } from '@/api/user/user.service'
import { Body, Controller, Inject, Patch, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly service: UserService,
  ) {}

  @Patch('me')
  async updateName(
    @Body() updateDto: UpdateUserDto,
    @Req() req: Request,
  ): Promise<User> {
    const user: User = <User>req.user

    return this.service.updateUser(updateDto, user)
  }
}
