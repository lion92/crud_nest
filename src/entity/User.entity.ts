import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Todo} from "./todo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    password: string
    @Column({ unique: true })
    email:string
    @Column()
    nom: string;
    @Column()
    prenom: string;

    @OneToMany(()=>Todo,(todo)=>todo.user)
    @JoinColumn()
    todo:Todo[]


}