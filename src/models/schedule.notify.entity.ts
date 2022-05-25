import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { schedule } from "src/models/schedule.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity({name: 'schedule_notify'})
export class schedule_notify{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => schedule, schedule => schedule.schedules_notify)
    schedule: schedule;

    @Column({name: 'schedule_id'})
    schedule_id: string;

    @Column({name: 'notify_number'})
    notify_number: string;

    @Column({name: 'message'})
    message: string;

}