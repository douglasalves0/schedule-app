import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScheduleModel } from "./schedule.entity";

@Entity()
export class ScheduleNotifyModel{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ScheduleModel, schedule => schedule.schedulesNotify)
    schedule: ScheduleModel;

    @Column()
    notifyNumber: string;

    @Column()
    message: string;

}