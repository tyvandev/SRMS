import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1682648054028 implements MigrationInterface {
  name = 'InitialMigration1682648054028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "student" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "first_name" varchar NOT NULL, "family_name" varchar NOT NULL, "email" varchar NOT NULL, "birth_date" datetime NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "result" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "course_id" integer NOT NULL, "student_id" integer NOT NULL, "score" varchar NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_result" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "course_id" integer NOT NULL, "student_id" integer NOT NULL, "score" varchar NOT NULL, CONSTRAINT "FK_294c0344ffc38b392ed06a9cba2" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_f902fcb7f457f7cf78251d0631b" FOREIGN KEY ("course_id") REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_result"("id", "created_at", "updated_at", "course_id", "student_id", "score") SELECT "id", "created_at", "updated_at", "course_id", "student_id", "score" FROM "result"`
    );
    await queryRunner.query(`DROP TABLE "result"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_result" RENAME TO "result"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "result" RENAME TO "temporary_result"`
    );
    await queryRunner.query(
      `CREATE TABLE "result" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "course_id" integer NOT NULL, "student_id" integer NOT NULL, "score" varchar NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "result"("id", "created_at", "updated_at", "course_id", "student_id", "score") SELECT "id", "created_at", "updated_at", "course_id", "student_id", "score" FROM "temporary_result"`
    );
    await queryRunner.query(`DROP TABLE "temporary_result"`);
    await queryRunner.query(`DROP TABLE "result"`);
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TABLE "student"`);
  }
}
