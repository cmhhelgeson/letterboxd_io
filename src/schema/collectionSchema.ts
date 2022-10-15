import {
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLString
} from "graphql"

import {MovieType} from "./movieSchema.js"

export type TMDBCollectionType = {
    id: number,
    name: string,
    overview: string,
    poster_path: null,
    backdrop_path: null,
}