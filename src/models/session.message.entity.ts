import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SessionModel } from "./session.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class SessionMessageModel{

    @PrimaryGeneratedColumn()
    id: uuidv4;

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