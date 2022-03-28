import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @IsString()
  @MinLength(4)
  readonly username: string

  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(8)
  readonly password: string

  @IsString()
  @IsOptional()
  readonly name?: string
}
