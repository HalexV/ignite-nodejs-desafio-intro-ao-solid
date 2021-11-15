import express from "express";
import swaggerUi from "swagger-ui-express";

import { usersRoutes } from "./routes/users.routes";
import swaggerDocument from "./swagger.json";

const options = {
  swaggerOptions: {
    // disable the Try It Out feature on all methods
    supportedSubmitMethods: [""],
    defaultModelsExpandDepth: -1,
  },
};

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

export { app };
