import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '@app/modules/user/user.entity';

export class AddUser1669834539569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(UserEntity, [
      {
        email: 'admin@admin.ee',
        passwordHash: 'someHASH',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.clear(UserEntity);
  }
}
