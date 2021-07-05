import { Request, Response } from "express";

import * as multer from 'multer';
import * as path from 'path';
import { getAllAuthors } from "./actions/authorActions";
import { createBook, deleteBook, getAllBooks, renameFile, updateBook } from "./actions/bookActions";
import { createReview, deleteReview } from "./actions/reviewActions";
import { getAllTopics } from "./actions/topicActions";

const uplaodMiddleware = multer({ dest: path.resolve('uploads/') })
export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    action: any[],

}
const upload = uplaodMiddleware.fields([
    {
        name: 'img',
        maxCount: 1
    },
    {
        name: 'file',
        maxCount: 1
    }
])
export const Routes: Route[] = [
    {
        method: 'get',
        route: '/book',
        action: [getAllBooks]
    }, {
        method: 'post',
        route: '/book',
        action: [upload, renameFile('file', 'file'), renameFile('image', 'img'), createBook]
    }, {
        method: 'patch',
        route: '/book/:id',
        action: [upload, renameFile('file', 'file'), renameFile('image', 'img'), updateBook]
    }, {
        method: 'delete',
        route: '/book/:id',
        action: [deleteBook]
    }, {
        method: 'post',
        route: '/review',
        action: [createReview]
    }, {
        method: 'delete',
        route: '/review/:bookId/:reviewId',
        action: [deleteReview]
    }, {
        method: 'get',
        route: '/topic',
        action: [getAllTopics]
    }, {
        method: 'get',
        route: '/author',
        action: [getAllAuthors]
    }
];