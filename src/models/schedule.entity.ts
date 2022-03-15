import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { session } from "./session.entity";
import { schedule_notify } from "./schedule.notify.entity";

@Entity({name: 'schedule'})
export class schedule{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => session, session => session.schedule)
    session: session;

    @Column()
    session_id: string;

    @OneToMany(() => schedule_notify, schedule_notify => schedule_notify.schedule)
    schedules_notify: schedule_notify[];

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