import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { session } from "./session.entity";
import { schedule_notify } from "./schedule.notify.entity";

@Entity({name: 'schedule'})
export class schedule{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => session, session => session.schedule)
    session: session;

    @Column({name: 'session_id'})
    session_id: string;

    @OneToMany(() => schedule_notify, schedule_notify => schedule_notify.schedule)
    schedules_notify: schedule_notify[];

    @Column({name: 'type'})
    type: string;

    @Column({name: 'date'})
    date: Date;

    @Column({name: 'status'})
    status: string;

    @Column({name: 'error'})
    error: string;

    @Column({name: 'created'})
    created: Date;

    @Column({name: 'updated'})
    updated: Date;

    @Column({name: 'code'})
    code: string;

}