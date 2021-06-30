import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";
import { Review } from "./Review";
import { Topic } from "./Topic";

@Entity()
export class Book {


    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title: string

    @Column()
    descrpition: string;

    @Column()
    pages: number;

    @Column()
    releaseYear: number;

    @ManyToOne(type => Author, { eager: true })
    author: Author;

    @Column()
    image: string;

    @Column({ nullable: true })
    file?: string

    @ManyToMany(t => Topic, t => t.books, { eager: true, onDelete: 'CASCADE' })
    @JoinTable({
        name: 'book_topic'
    })
    topics: Topic[]

    @OneToMany(t => Review, r => r.book, { eager: true })
    reviews: Review[]
}