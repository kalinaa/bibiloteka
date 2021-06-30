import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id?: number;


    @Column()
    content: string;

    @Column()
    rating: number;

    @ManyToOne(t => Book, { eager: false, primary: true, onDelete: 'CASCADE' })
    book: Book

    @ManyToOne(t => User, { eager: true, onDelete: 'SET NULL', nullable: true })
    user?: User
}