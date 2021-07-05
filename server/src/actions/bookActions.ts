import { Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
import { getManager, getRepository } from "typeorm";
import { Book } from "../entity/Book";
import { Review } from "../entity/Review";


export async function getAllBooks(req: Request, res: Response) {
    const books = await getRepository(Book).find();
    res.json(books);

}

export async function createBook(req: Request, res: Response) {
    const data = req.body
    const topics = data.topics as string;
    data.topics = topics.split(';').map(element => {
        return {
            id: parseInt(element)
        }
    })
    data.topics.pop();
    console.log(data);
    const book = await getManager().save(Book, {
        ...data,
        descrition: data.description,
        author: {
            id: parseInt(data.author),
        },
        releaseYear: parseInt(data.releaseYear),
        pages: parseInt(data.pages)
    });

    res.json({
        id: book.id
    })
}
export async function updateBook(req: Request, res: Response) {
    const data = req.body
    const topics = data.topics as string;
    data.topics = topics.split(';').map(element => {
        return {
            id: parseInt(element)
        }
    })
    data.topics.pop();
    console.log(data);
    const book = await getManager().save(Book, {
        ...data,
        id: Number(req.params.id),
        descrition: data.description,
        author: {
            id: parseInt(data.author),
        },
        releaseYear: parseInt(data.releaseYear),
        pages: parseInt(data.pages)
    });

    res.sendStatus(204);
}
export async function deleteBook(req: Request, res: Response) {

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send('Id is not a number');
        return;
    }
    await getRepository(Book).delete(id);
    res.sendStatus(204);
}


export function renameFile(name: string, fliename: string) {

    return function handleUpload(request: Request, res: Response, next?: any) {
        if (!request.files) {
            next();
        }
        const file = request.files[fliename][0];
        const tempPath = file.path;
        const targetPath = path.resolve('uploads/' + file.originalname);
        const data = request.body;
        data[name] = file.originalname;
        fs.rename(tempPath, targetPath, err => {

        })
        next();
    }
}

export async function createReview(req: Request, res: Response) {
    const data = req.body;
    const user = (req.session as any).user;
    const insertResult = await getRepository(Review).insert({
        book: {
            id: data.book.id,
        },
        user: {
            id: user.id
        },
        content: data.content,
        rating: data.rating
    })
    res.json({
        id: insertResult.identifiers[0].id
    })
}