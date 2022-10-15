import express from "express"
import dotenv from "dotenv"

import schema from "./schema/tmdbSchema.js"
import { graphqlHTTP } from "express-graphql";

dotenv.config();

const app = express();


const root = {
    hello: () => {
        return "Hello";
    }
}

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql")
