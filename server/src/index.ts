import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import * as express from "express";
import * as session from 'express-session'
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as cors from 'cors'
import * as https from 'https'
import * as fs from 'fs'

createConnection().then(async connection => {
    const key = fs.readFileSync('./key.pem', 'utf8');
    const cert = fs.readFileSync('./cert.pem', 'utf8');
    // create express app
    const app = express();
    app.use(cors({
        credentials: true,//protiv xss napada

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        origin: 'http://localhost:3000'

    }));
    app.use(express.json());
    app.use(session({
        secret: 'adsfgdhtydadsfadfsafsjtiuyi',
        resave: false,

        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            secure: true,
            maxAge: 1000 * 60 * 10,
            httpOnly: true,
        }

    }))
    app.post('/login', async (req, res) => {


    })
    app.post('/logout', async (request: Request, response: Response) => {
        delete (request.session as any).user;
        request.session.destroy((err) => {
            if (err)
                response.sendStatus(500);
        })
        response.sendStatus(204);
    })
    app.get('/check', async (req, res) => {

    })
    /*     app.use((req, res, next) => {
            const user = (req.session as any).user;
            if (!user) {
                res.sendStatus(403);
            } else {
                next();
            }
        }) */
    app.use('/assets', express.static('file'))
    Routes.forEach(route => {
        app[route.method](route.route, ...route.action);
    });

    // setup express app here
    // ...

    // start express server

    const server = https.createServer({
        key: key,
        cert: cert,
    }, app)
    server.listen(process.env.PORT || 4000, () => console.log('app is listening'))




}).catch(error => console.log(error));
async function getUser(table: any, email: string, password: string) {

    const repository = getRepository(table);
    return await repository.find({
        where: {
            email: email,
            sifra: password,

        }
    })
}