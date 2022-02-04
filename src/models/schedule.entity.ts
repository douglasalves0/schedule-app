
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";
import { ScheduleNotify } from "./schedule.notify.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Schedule{

    @PrimaryGeneratedColumn()
    id: uuidv4;

    @ManyToOne(() => Session, session => session.schedule)
    session: Session;

    @OneToMany(() => ScheduleNotify, scheduleNotify => scheduleNotify.schedule)
    schedulesNotify: ScheduleNotify[];

    @Column()
    code: string;

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

}