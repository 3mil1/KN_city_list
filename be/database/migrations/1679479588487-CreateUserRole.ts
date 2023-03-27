import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRole1679479588487 implements MigrationInterface {
  name = 'CreateUserRole1679479588487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "cities"
        (
            "id"    integer           NOT NULL,
            "name"  character varying NOT NULL,
            "photo" character varying NOT NULL,
            CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "users"
        (
            "id"           uuid              NOT NULL DEFAULT uuid_generate_v4(),
            "email"        character varying NOT NULL,
            "passwordHash" character varying NOT NULL,
            CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "roles"
        (
            "id"   SERIAL            NOT NULL,
            "role" character varying NOT NULL,
            CONSTRAINT "UQ_ccc7c1489f3a6b3c9b47d4537c5" UNIQUE ("role"),
            CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE TABLE "user_roles"
        (
            "id"      SERIAL NOT NULL,
            "user_id" uuid,
            "role_id" integer,
            CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        ALTER TABLE "user_roles"
            ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE "user_roles"
            ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "cities"`);
  }
}
