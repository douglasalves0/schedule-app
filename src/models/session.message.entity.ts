import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";

@Entity({name: 'session_message'})
export class SessionMessage{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Session, session => session.sessionMessages)
    session: Session;

    @Column()
    session_id: string;

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