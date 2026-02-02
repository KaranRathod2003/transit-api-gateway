import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export interface RequestWithId extends Request{
  requestId?: string;
}

export const requestIdMiddleware = (
    req: RequestWithId,
    res : Response,
    next : NextFunction
) =>{
    const IncomingRequestId = req.header("X-REQUEST-ID");
    
    const requestId = IncomingRequestId || uuidv4();

    req.requestId = requestId;
    res.setHeader("X-REQUEST-ID", requestId);
    next();
}