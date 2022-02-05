import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Schedule } from "src/models/schedule.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class ScheduleNotify{

    @PrimaryGeneratedColumn()
    id: uuidv4;

    @ManyToOne(() => Schedule, schedule => schedule.schedulesNotify)
    schedule: Schedule;

    @Column()
    notify_number: string;

    @Column()
    message: string;

}