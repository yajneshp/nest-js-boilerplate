import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { loggers } from 'winston';

@Injectable()
export class SetCorrelationId implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    loggers.options.defaultMeta = '123-123';
    if (!('correlationid' in req.headers)) {
      req.headers['correlationid'] = 'api-generated-' + randomUUID();
    }
    next();
  }
}
