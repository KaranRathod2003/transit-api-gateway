import express from "express";
import dotenv from "dotenv";
import { TenantRequest, tenantResolver } from "./middlewares/tenantResolver";
import {requestIdMiddleware} from "./middlewares/requestId";
dotenv.config();

const app = express();
app.use(express.json());
app.use(requestIdMiddleware);
app.get("/health", (_req, res) => {
  res.json({
    status: "UP",
    service: "transit-api-gateway",
    timestamp: new Date().toISOString()
  });
});

//protected test route
app.get("/test-tenant", tenantResolver, (req: TenantRequest, res) => {
    res.json({
        message : "Tenant resolved successfully",
        tenantId : req.tenantId
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
