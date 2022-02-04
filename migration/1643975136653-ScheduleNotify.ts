import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ScheduleNotify1643975136653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'schedule_notify',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },{
                        name: 'schedule_id',
                        type: 'uuid',
                    },{
                        name: 'notify_number',
                        type: 'varchar'
                    },{
                        name: 'message',
                        type: 'varchar'
                    }
                ]
            })
        );
        await queryRunner.createForeignKey(
            'schedule_notify',
            new TableForeignKey({
                columnNames: ['schedule_id'],
                referencedTableName: 'schedule',
                referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("schedule_notify");
    }

}
