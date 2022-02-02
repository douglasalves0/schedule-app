import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SessionModel } from "./session.entity";

@Entity()
export class SessionMessageModel{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SessionModel, session => session.sessionMessages)
    session: SessionModel;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column()
    message: string;

    @Column()
    direction: string;

    @Column()
    date: Date;

} 