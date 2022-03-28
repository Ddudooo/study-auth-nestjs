import { UpdateUserDto } from '@/api/user/dto/updateUser.dto'
import { User } from '@/api/user/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async updateUser(updateDto: UpdateUserDto, user: User): Promise<User> {
    const { email, name, password } = updateDto
    const updateUser = {
      ...user,
      ...(email && { email }),
      ...(name && { name }),
      ...(password && { password }),
    }

    return this.repository.save(updateUser, { reload: true })
  }
}
