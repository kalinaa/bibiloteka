import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Topic {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(t => Book, b => b.topics, { eager: false, onDelete: 'CASCADE' })
    books: Book[];
}