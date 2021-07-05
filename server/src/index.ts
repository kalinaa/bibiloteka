import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import * as express from "express";
import * as session from 'express-session'
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as cors from 'cors'
import * as https from 'https'
import * as fs from 'fs'
import { User } from "./entity/User";

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
        const { email, password } = req.body;
        const users = await getRepository(User).find({
            where: {
                password,
                email
            }
        });
        if (users.length === 0) {
            res.status(400).send('User doesn\'t exist');
        } else {
            (req.session as any).user = users[0];
            req.session.save();
            res.json(users[0]);
        }

    })
    app.post('/register', async (req, res) => {
        const user = req.body as User;
        const users = await getRepository(User).find({
            where: {

                email: user.email
            }
        });
        if (users.length > 0) {
            res.status(400).send('User already exists');
        } else {
            const insertResult = await getRepository(User).insert(user);
            user.id = insertResult.identifiers[0].id;
            (req.session as any).user = user;
            req.session.save();
            res.json(user);
        }
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
        const user = (req.session as any).user;
        if (!user) {
            res.status(401).send('User is not logged in');
        } else {
            res.json(user);
        }
    })
    app.use((req, res, next) => {
        const user = (req.session as any).user;
        if (!user) {
            res.sendStatus(403);
        } else {
            next();
        }
    })

    app.use('/uploads', express.static('uploads'))
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
