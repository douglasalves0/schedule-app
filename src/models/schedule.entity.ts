
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SessionModel } from "./session.entity";
import { ScheduleNotifyModel } from "./schedule.notify.entity";

@Entity()
export class ScheduleModel{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SessionModel, session => session.schedule)
    session: SessionModel;

    @OneToMany(() => ScheduleNotifyModel, scheduleNotify => scheduleNotify.schedule)
    schedulesNotify: ScheduleNotifyModel[];

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