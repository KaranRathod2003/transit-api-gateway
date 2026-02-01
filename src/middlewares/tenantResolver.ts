import { Response, Request, NextFunction } from "express";

export interface TenantRequest extends Request {
  tenantId?: string;
}

export const tenantResolver = (
    req : TenantRequest,
    res : Response,
    next : NextFunction
) =>{
    const tenantId = req.header("X-Tenant-ID");
    if(!tenantId){
        return res.status(400).json({
            error:"Tenant_ID is missing",
            message : "X-Tenant-ID header is required"
        })
    }
    req.tenantId = tenantId;
    next();
};
