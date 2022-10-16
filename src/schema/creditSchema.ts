import { GraphQLObjectType, GraphQLString } from "graphql";


export const CreditType = new GraphQLObjectType({
    name: "CreditType",
    description: "Query credit information",
    fields: () => ({
        creditType: {
            type: GraphQLString, 
            resolve: credit => credit.credit_type
        },
        department: {type: GraphQLString},
        job: {type: GraphQLString},
        mediaType: {type: GraphQLString}
    })
})