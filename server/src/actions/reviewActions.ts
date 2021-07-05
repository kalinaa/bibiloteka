import { Request, Response } from "express";
import { parse } from "node:path";
import { getRepository } from "typeorm";
import { Review } from "../entity/Review";

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
export async function deleteReview(req: Request, res: Response) {
    const bookId = parseInt(req.params.bookId);
    const reviewId = parseInt(req.params.reviewId);
    await getRepository(Review).delete({
        id: reviewId,
        book: {
            id: bookId
        }
    })
    res.sendStatus(204);
}