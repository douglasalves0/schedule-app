import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ScheduleModel } from "./schedule.entity";
import { SessionMessageModel } from "./session.message.entity";

@Entity()
export class SessionModel{

    @PrimaryGeneratedColumn()
    id: number;

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