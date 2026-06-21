import express from "express";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import {httpLogger} from "./middlewares/logger.middleware";
import { performanceLogger } from "./middlewares/performance.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());
app.use(httpLogger);
app.use("/api/v1", routes);
app.use(errorMiddleware);
app.use(performanceLogger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
