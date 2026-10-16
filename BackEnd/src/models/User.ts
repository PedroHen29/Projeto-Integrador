import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
@Entity('users')
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100, nullable: false })
    name: string

    @Column({ length: 100, nullable: false })
    email: string

    @Column({ length: 255, nullable: false })
    password: string

}