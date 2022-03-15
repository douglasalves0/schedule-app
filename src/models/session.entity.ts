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

    @Column()
    wa_user: string;

    @Column()
    started: Date;

    @Column()
    latest_message: Date;

    @Column()
    status: string;

}