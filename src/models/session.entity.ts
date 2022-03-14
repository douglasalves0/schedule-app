import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Schedule } from "src/models/schedule.entity";
import { SessionMessage } from "./session.message.entity";

@Entity({name: 'session'})
export class Session{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Schedule, schedule => schedule.session)
    schedule: Schedule[];

    @OneToMany(() => SessionMessage, sessionMessage => sessionMessage.session)
    sessionMessages: SessionMessage[];

    @Column()
    wa_user: string;

    @Column()
    started: Date;

    @Column()
    latest_message: Date;

    @Column()
    status: string;

}