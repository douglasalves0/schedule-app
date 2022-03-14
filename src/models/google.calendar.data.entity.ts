import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "google_calendar_data"})
export class GoogleCalendarData{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    whatsapp_number: string;

    @Column()
    refresh_token: string;

    @Column()
    created: Date;

    @Column()
    updated: Date;

}