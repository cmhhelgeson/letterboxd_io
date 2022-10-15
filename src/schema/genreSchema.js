import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} from "graphql";

export const GenreType = new GraphQLObjectType({
    name: "Genre", 
    description: "Query genre information",
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString}
    })
})