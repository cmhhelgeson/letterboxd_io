import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLBoolean,
    

} from "graphql"

import { MovieType } from "./movieSchema.js"

export const PersonType = new GraphQLObjectType({
    name: "Person",
    description: "Query person information.",
    fields: () => ({
        birthday: { type: GraphQLString },
        knownFor: {
            type: GraphQLString,
            resolve: person => person.known_for_department
        },
        deathday: {type: GraphQLString},
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        knownAs: {
            type: new GraphQLList(GraphQLString),
            resolve: person => person.also_known_as
        },
        gender: {type: GraphQLInt},
        biography: {type: GraphQLString},
        popularity: {type: GraphQLFloat},
        birthPlace: {
            type: GraphQLString,
            resolve: person => person.place_of_birth,
        },
        profileImage: {
            type: GraphQLString,
            resolve: person => person.profile_path,
        },
        adult: {type: GraphQLBoolean},
        imdbID: {
            type: GraphQLString,
            resolve: person => person.imdb_id
        },
        homepage: {
            type: GraphQLString,
            resolve: person => person.homepage ? person.homepage : null
        },
    })
})