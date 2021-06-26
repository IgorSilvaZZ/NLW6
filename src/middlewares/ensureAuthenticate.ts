import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayLoad {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

    const [, token ] = authToken.split(' ');

    try {

        const { sub } = verify(token, '4d040153a7bc781052400a3f2119afe2') as IPayLoad;

        req.user_id = sub;

        return next();
        
    } catch (error) {
        return res.status(401).end()
    }

}