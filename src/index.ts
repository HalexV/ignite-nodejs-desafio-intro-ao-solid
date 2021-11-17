import express from "express";
import jsonRefs from "json-refs";
import swaggerUi from "swagger-ui-express";

import openapiDocument from "../docs/swagger/openapi.json";
import { usersRoutes } from "./routes/users.routes";

const options = {
  swaggerOptions: {
    // disable the Try It Out feature on all methods
    supportedSubmitMethods: [""],
    // order by HTTP method
    operationsSorter: "method",
  },
};

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

jsonRefs
  .resolveRefs(openapiDocument, { location: "./docs/swagger/openapi.json" })
  .then((openapiObj) => {
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(openapiObj.resolved, options)
    );

    // console.dir(openapiObj, { depth: null });
  });

export { app };
