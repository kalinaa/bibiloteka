import { Request, Response } from "express";

import * as multer from 'multer';
import * as path from 'path';

const upload = multer({ dest: path.resolve('file/') })
export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    action: any[],

}
export const Routes: Route[] = [

];