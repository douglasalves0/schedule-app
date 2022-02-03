import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScheduleModel } from "./schedule.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class ScheduleNotifyModel{

    @PrimaryGeneratedColumn()
    id: uuidv4;

    @ManyToOne(() => ScheduleModel, schedule => schedule.schedulesNotify)
    schedule: ScheduleModel;

    @Column()
    notifyNumber: string;

    @Column()
    message: string;

}