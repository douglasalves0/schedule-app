import {MigrationInterface, QueryRunner, Table} from "typeorm";


export class GoogleCalendarData1647257582811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'google_calendar_data',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },{
                        name: 'whatsapp_number',
                        type: 'varchar',
                    },{
                        name: 'refresh_token',
                        type: 'varchar'
                    },{
                        name: 'created',
                        type: 'timestamp',
                        default: 'now()'
                    },{
                        name: 'updated',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            }), true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('google_calendar_data');
    }

}
