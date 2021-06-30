import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Book } from "../entity/Book";


export async function getAllBooks(req: Request, res: Response) {
    const books = await getRepository(Book).find();
    res.json(books);

}

export async function createBook(req: Request, res: Response) {
    const data = req.body as Book;
    const insertResult = await getRepository(Book).insert(data);
    res.json({
        id: insertResult.identifiers[0].id
    })
}
export async function updateBook(req: Request, res: Response) {
    const data = req.body as Book;
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send('Id is not a number');
        return;
    }
    await getRepository(Book).update(id, data);
    res.sendStatus(204);
}
export async function deleteBook(req: Request, res: Response) {
    const data = req.body as Book;
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send('Id is not a number');
        return;
    }
    await getRepository(Book).delete(id);
    res.sendStatus(204);
}