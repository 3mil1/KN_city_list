import { MigrationInterface, QueryRunner } from 'typeorm';

export class Create1678718316432 implements MigrationInterface {
  name = 'Create1678718316432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "cities"
                             (
                                 "id"    integer           NOT NULL,
                                 "name"  character varying NOT NULL,
                                 "photo" character varying NOT NULL,
                                 CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "users"
                             (
                                 "id"           uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "email"        character varying NOT NULL,
                                 "passwordHash" character varying NOT NULL,
                                 CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "cities"`);
  }
}
