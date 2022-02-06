import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity({name: 'session_message'})
export class SessionMessage{

    @PrimaryGeneratedColumn()
    id: uuidv4;

    @ManyToOne(() => Session, session => session.sessionMessages)
    session: Session;

    @Column()
    session_id: uuidv4;

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