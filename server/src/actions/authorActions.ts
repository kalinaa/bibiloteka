import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Author } from "../entity/Author";

export async function getAllAuthors(req: Request, res: Response) {
    const books = await getRepository(Author).find();
    res.json(books);

}