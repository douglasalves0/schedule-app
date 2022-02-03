import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ScheduleModel } from "./schedule.entity";
import { SessionMessageModel } from "./session.message.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class SessionModel{

    @PrimaryGeneratedColumn()
    id: uuidv4;

    @OneToMany(() => ScheduleModel, schedule => schedule.session)
    schedule: ScheduleModel[];

    @OneToMany(() => SessionMessageModel, sessionMessage => sessionMessage.session)
    sessionMessages: SessionMessageModel[];

    @Column()
    waUser: string;

    @Column()
    started: Date;

    @Column()
    latestMessage: Date;

    @Column()
    status: string;

}