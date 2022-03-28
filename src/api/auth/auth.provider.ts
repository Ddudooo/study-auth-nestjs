import { User } from '@/api/user/user.entity'
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { Repository } from 'typeorm'

@Injectable()
export class AuthProvider {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null)
  }

  async validateUser(decoded: any): Promise<User> {
    return this.repository.findOne(decoded.id)
  }

  generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.email })
  }

  async isPasswordValid(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return compare(password, userPassword)
  }

  async encodePassword(password: string, salOrRounds = 10): Promise<string> {
    return hash(password, salOrRounds)
  }

  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token)

    if (!decoded) {
      throw new ForbiddenException('Forbidden!')
    }

    const user: User = await this.validateUser(decoded)

    if (!user) {
      throw new UnauthorizedException()
    }

    return true
  }
}
