import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class SessionMessage1643932742330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'session_message',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },{
                        name: 'session_id',
                        type: 'uuid',
                    },{
                        name: 'direction',
                        type: 'varchar'
                    },{
                        name: 'from',
                        type: 'varchar'
                    },{
                        name: 'to',
                        type: 'varchar'
                    },{
                        name: 'message',
                        type: 'varchar'
                    },{
                        name: 'date',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            }), true
        );
        await queryRunner.createForeignKey(
            'session_message',
            new TableForeignKey({
                columnNames: ['session_id'],
                referencedTableName: 'session',
                referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("session_message");
    }

}
