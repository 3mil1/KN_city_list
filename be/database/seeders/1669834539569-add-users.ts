import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '@app/modules/user/user.entity';
import { RoleEntity } from '@app/modules/role/role.entity';
import { UserRoleEntity } from '@app/modules/role/user-role.entity';

export class AddUser1669834539569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRole = new RoleEntity();
    userRole.role = 'ROLE_USER';

    const editorRole = new RoleEntity();
    editorRole.role = 'ROLE_ALLOW_EDIT';

    await queryRunner.manager.save([userRole, editorRole]);

    const adminUser = {
      email: 'admin@admin.ee',
      passwordHash:
        '$scrypt$N=32768,r=8,p=1,maxmem=67108864$4/6tvajNiL4WopM5DGWL7tUhPar5/xv9O9H8HqzeJLM$++WcCncFjUjrajwQeGzry1PCai7ns8Fq1eTHY38RvQ4NwxjNlHVsQf3igYfjnF1YhbStX3m0fTUfwZizytvC7Q',
    };

    const normalUser = {
      email: 'user@user.ee',
      passwordHash:
        '$scrypt$N=32768,r=8,p=1,maxmem=67108864$62/E/C1u5bglWkPZdkkQ3ES7XUexT4asujCJAsxawKY$OKEkLK/H+BvqYK/IVaai28t/yDLEMbNYiZARwK8Cxe4J4yUJTiGh/7Rr+TYCuH0wYpLzqF1qG3WI2EsRZo2HYA',
    };

    const insertedAdminUser = await queryRunner.manager.insert(UserEntity, adminUser);
    const insertedNormalUser = await queryRunner.manager.insert(UserEntity, normalUser);

    const adminRoleRelation = new UserRoleEntity();
    adminRoleRelation.user = await queryRunner.manager.findOne(UserEntity, {
      where: { id: insertedAdminUser.identifiers[0].id as string },
    });
    adminRoleRelation.role = editorRole;

    const userRoleRelation = new UserRoleEntity();
    userRoleRelation.user = await queryRunner.manager.findOne(UserEntity, {
      where: { id: insertedNormalUser.identifiers[0].id as string },
    });
    userRoleRelation.role = userRole;

    await queryRunner.manager.save([adminRoleRelation, userRoleRelation]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.clear(UserRoleEntity);
    await queryRunner.manager.clear(UserEntity);
    await queryRunner.manager.clear(RoleEntity);
  }
}
