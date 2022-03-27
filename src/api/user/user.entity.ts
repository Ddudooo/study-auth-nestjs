import { DefaultEntity } from '@/common/typeorm/baseEntities'
import { Exclude } from 'class-transformer'
import { Column, Entity } from 'typeorm'

@Entity({ name: 'users' })
export class User extends DefaultEntity {
  @Column({ type: 'varchar', comment: '유저 id' })
  username!: string

  @Exclude()
  @Column({ type: 'varchar', comment: '유저 패스워드' })
  password!: string

  @Column({ type: 'varchar', comment: '유저 이메일' })
  email!: string

  @Column({ type: 'varchar', nullable: true, comment: '유저 이름' })
  name: string | null

  @Column({
    type: 'timestamptz',
    nullable: true,
    default: null,
    comment: '마지막 로그인 시간',
  })
  lastLoginAt: Date | null
}
