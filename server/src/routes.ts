import { Request, Response } from "express";

import * as multer from 'multer';
import * as path from 'path';
import { getAllAuthors } from "./actions/authorActions";
import { createBook, deleteBook, getAllBooks, updateBook } from "./actions/bookActions";
import { createReview, deleteReview } from "./actions/reviewActions";
import { getAllTopics } from "./actions/topicActions";

const uploadFile = multer({ dest: path.resolve('file/') })
const uploadImage = multer({ dest: path.resolve('img/') })
export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    action: any[],

}
export const Routes: Route[] = [
    {
        method: 'get',
        route: '/book',
        action: [getAllBooks]
    }, {
        method: 'post',
        route: '/book',
        action: [uploadFile, uploadImage, createBook]
    }, {
        method: 'patch',
        route: '/book/:id',
        action: [uploadFile, uploadImage, updateBook]
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