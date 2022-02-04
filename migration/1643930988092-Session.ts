import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Session1643848950714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'session',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },{
                        name: 'wa_user',
                        type: 'varchar'
                    },{
                        name: 'started',
                        type: 'timestamp',
                        default: 'now()'
                    },{
                        name: 'latest_message',
                        type: 'timestamp',
                        default: 'now()'
                    },{
                        name: 'status',
                        type: 'varchar'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("session");
    }

}