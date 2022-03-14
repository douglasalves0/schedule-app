import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";
import { ScheduleNotify } from "./schedule.notify.entity";

@Entity({name: 'schedule'})
export class Schedule{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Session, session => session.schedule)
    session: Session;

    @Column()
    session_id: string;

    @OneToMany(() => ScheduleNotify, scheduleNotify => scheduleNotify.schedule)
    schedulesNotify: ScheduleNotify[];

    @Column()
    type: string;

    @Column()
    date: Date;

    @Column()
    status: string;

    @Column()
    error: string;

    @Column()
    created: Date;

    @Column()
    updated: Date;

    @Column()
    code: string;

}