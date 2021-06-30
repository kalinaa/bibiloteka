import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Topic } from "../entity/Topic";

export async function getAllTopics(req: Request, res: Response) {
    const books = await getRepository(Topic).find();
    res.json(books);

}