const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateEnderecoTable1733335699654 {
    name = 'CreateEnderecoTable1733335699654'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcategorias" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "categoriaId" integer NOT NULL, CONSTRAINT "PK_9bbef90f7112e787d4e4b23d455" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "configuracoes" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "valor" character varying NOT NULL, CONSTRAINT "PK_7640d21fdc17722366904769d9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cupons" ("id" SERIAL NOT NULL, "codigo" character varying NOT NULL, "desconto" numeric(10,2) NOT NULL, "validade" date NOT NULL, CONSTRAINT "UQ_252bc40922061270d3eed03b142" UNIQUE ("codigo"), CONSTRAINT "PK_a391ecb025ec40b07972ed7de19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" SERIAL NOT NULL, "clienteId" integer NOT NULL, "produtos" json NOT NULL, "total" numeric(10,2) NOT NULL, "dataPedido" date NOT NULL, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "preco" numeric(10,2) NOT NULL, "descricao" text, "subcategoriaId" integer NOT NULL, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "regra" character varying NOT NULL, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subcategorias" ADD CONSTRAINT "FK_55b0166e1926780a24cdda43be0" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_913a21f4c9e3ec449a0f2fd0d0a" FOREIGN KEY ("subcategoriaId") REFERENCES "subcategorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_913a21f4c9e3ec449a0f2fd0d0a"`);
        await queryRunner.query(`ALTER TABLE "subcategorias" DROP CONSTRAINT "FK_55b0166e1926780a24cdda43be0"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "cupons"`);
        await queryRunner.query(`DROP TABLE "configuracoes"`);
        await queryRunner.query(`DROP TABLE "subcategorias"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
    }
}
