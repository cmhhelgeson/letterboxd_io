
import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
} from "graphql";

import { GenreType } from "./genreSchema.js";
import { parseOriginalLanguage } from "./schemaUtils.ts";
import { LanguageType } from "./languageSchema.ts";



export const MovieType = new GraphQLObjectType({
    name: "Movie",
    description: "Query movie information.",
    fields: () => ({
        adult: {type: GraphQLBoolean},
        backdropImage: {
            type: GraphQLString,
            resolve: movie => movie.backdrop_path,
        },
        //TODO: 
        //belongsToCollection:
        budget: {type: GraphQLInt},
        genres: {
            type: new GraphQLList(GenreType),
            resolve: movie => movie.genres
        },
        homepage: {type: GraphQLString},
        id: {type: GraphQLInt}, 
        imdbID: {
            type: GraphQLString,
            resolve: movie => movie.imdb_id
        },
        originalLanguage: {
            type: GraphQLString,
            resolve: movie => parseOriginalLanguage(movie.original_language)
        },
        originalLanguageISO: {
            type: GraphQLString,
            resolve: movie => movie.original_language
        },
        originalTitle: {
            type: GraphQLString,
            resolve: movie => movie.original_title,
        },
        overview: {type: GraphQLString},
        popularity: {type: GraphQLInt},
        posterImage: {
            type: GraphQLString,
            resolve: movie => movie.poster_path
        },
        runtime: {type: GraphQLInt},
        
        spokenLanguages: {
            type: new GraphQLList(LanguageType()),
            resolve: movie => movie.spoken_languages
        },
        status: {type: GraphQLString},
        tagline: {type: GraphQLString},
        title: {type: GraphQLString},
        video: {type: GraphQLBoolean},
        voteAverage: {
            type: GraphQLFloat,
            resolve: movie => movie.vote_average,
        },
        voteCount: {
            type: GraphQLInt,
            resolve: movie => movie.vote_count
        }
    })
})