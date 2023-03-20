import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '@app/modules/user/user.entity';

export class AddUser1669834539569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(UserEntity, [
      {
        email: 'admin@admin.ee',
        passwordHash:
          '$scrypt$N=32768,r=8,p=1,maxmem=67108864$4/6tvajNiL4WopM5DGWL7tUhPar5/xv9O9H8HqzeJLM$++WcCncFjUjrajwQeGzry1PCai7ns8Fq1eTHY38RvQ4NwxjNlHVsQf3igYfjnF1YhbStX3m0fTUfwZizytvC7Q',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.clear(UserEntity);
  }
}
