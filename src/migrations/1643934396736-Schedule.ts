import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Schedule1643934396736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'schedule',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },{
                        name: 'session_id',
                        type: 'uuid',
                    },{
                        name: 'type',
                        type: 'varchar'
                    },{
                        name: 'status',
                        type: 'varchar'
                    },{
                        name: 'date',
                        type: 'timestamp',
                        default: 'now()'
                    },{
                        name: 'error',
                        type: 'varchar'
                    }
                ]
            })
        );
        await queryRunner.createForeignKey(
            'schedule',
            new TableForeignKey({
                columnNames: ['session_id'],
                referencedTableName: 'session',
                referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("schedule");
    }

}
