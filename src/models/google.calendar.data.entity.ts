import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "google_calendar_data"})
export class google_calendar_data{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'whatsapp_number'})
    whatsapp_number: string;

    @Column({name: 'refresh_token'})
    refresh_token: string;

    @Column({name: 'created'})
    created: Date;

    @Column({name: 'updated'})
    updated: Date;

}