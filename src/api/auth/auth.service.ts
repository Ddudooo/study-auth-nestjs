import { AuthProvider } from '@/api/auth/auth.provider'
import { LoginDto } from '@/api/auth/dto/login.dto'
import { RegisterDto } from '@/api/auth/dto/register.dto'
import { User } from '@/api/user/user.entity'
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly provider: AuthProvider,
  ) {}

  async register(body: RegisterDto): Promise<User | never> {
    const { username, email, password, name } = body
    const user: User = await this.repository.findOne({ where: { username } })

    if (user) {
      throw new ConflictException()
    }

    const registerUser = {
      username,
      email,
      name,
      password: await this.provider.encodePassword(password),
    }

    return this.repository.save(registerUser, { reload: true })
  }

  async login(loginDto: LoginDto): Promise<string | never> {
    const { username, password } = loginDto
    const user: User = await this.repository.findOne({ where: { username } })

    if (!user) {
      throw new UnauthorizedException()
    }

    const isPasswordValid: boolean = await this.provider.isPasswordValid(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException()
    }

    await this.repository.update(user.id, { lastLoginAt: new Date() })

    return this.provider.generateToken(user)
  }

  async refreshToken(user: User): Promise<string> {
    await this.repository.update(user.id, { lastLoginAt: new Date() })

    return this.provider.generateToken(user)
  }
}
