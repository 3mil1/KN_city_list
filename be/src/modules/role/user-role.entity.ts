import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoleEntity } from '@app/modules/role/role.entity';
import { UserEntity } from '@app/modules/user/user.entity';

@Entity({ name: 'user_roles' })
export class UserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.roles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
