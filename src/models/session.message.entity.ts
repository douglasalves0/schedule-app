import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { session } from "./session.entity";

@Entity({name: 'session_message'})
export class session_message{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => session, session => session.session_messages)
    session: session;

    @Column({name: "session_id"})
    session_id: string;

    @Column({name: 'from'})
    from: string;

    @Column({name: 'to'})
    to: string;

    @Column({name: 'message'})
    message: string;

    @Column({name: 'direction'})
    direction: string;

    @Column({name: 'date'})
    date: Date;

} 