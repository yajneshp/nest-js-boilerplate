import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction} from 'express'

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Requesting Resource : ', req.originalUrl)
        console.log('Request Body: ', req.body);        
        console.log('Request Query Params: ', req.query);
        console.log('Request Headers: ', req.headers);
        // console.log('Request : ', req);
        next();
    }
}