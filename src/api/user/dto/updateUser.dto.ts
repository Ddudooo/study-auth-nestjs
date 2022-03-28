import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  readonly email?: string

  @IsString()
  @IsOptional()
  readonly name?: string

  @IsString()
  @IsOptional()
  readonly password?: string
}
