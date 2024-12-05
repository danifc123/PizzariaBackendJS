const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Seila1733360054998 {
    name = 'Seila1733360054998'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "telefone" character varying NOT NULL, "endereco" character varying NOT NULL, CONSTRAINT "UQ_3cd5652ab34ca1a0a2c7a255313" UNIQUE ("email"), CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "clientes"`);
    }
}
