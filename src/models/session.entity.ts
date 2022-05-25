import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { schedule } from "src/models/schedule.entity";
import { session_message } from "./session.message.entity";

@Entity({name: 'session'})
export class session{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => schedule, schedule => schedule.session)
    schedule: schedule[];

    @OneToMany(() => session_message, session_message => session_message.session)
    session_messages: session_message[];

    @Column({name: 'wa_user'})
    wa_user: string;

    @Column({name: 'started'})
    started: Date;

    @Column({name: 'latest_message'})
    latest_message: Date;

    @Column({name: 'status'})
    status: string;

}