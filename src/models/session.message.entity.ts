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