import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEntity } from '@app/modules/role/user-role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  roles: UserRoleEntity[];
}
