
import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
} from "graphql";

import { GenreType } from "./genreSchema.js";
import { parseOriginalLanguage } from "./schemaUtils.js";
import { LanguageType } from "./languageSchema.js";
import { CompanyType } from "./companySchema.js";

export const MovieType = new GraphQLObjectType({
    name: "Movie",
    description: "Query movie information.",
    fields: () => ({
        adult: {
            type: GraphQLBoolean,
            description: "Adult/Pornographic status of movie"
        },
        backdropImage: {
            type: GraphQLString,
            description: "Path to the backdrop image for the movie's TMDB page",
            resolve: movie => movie.backdrop_path,
        },
        //TODO: 
        //belongsToCollection:
        budget: {
            type: GraphQLInt,
            description: "Budget of the film in U.S dollars"
        },
        genres: {
            type: new GraphQLList(GenreType),
            description: "Genres of the film",
            resolve: movie => movie.genres
        },
        homepage: {
            type: GraphQLString,
            description: "Webpage or marketing page for the film"
        },
        id: {type: GraphQLInt}, 
        imdbID: {
            type: GraphQLString,
            resolve: movie => movie.imdb_id
        },
        originalLanguage: {
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
        productionCompanies: {
            type: new GraphQLList(CompanyType()),
            resolve: movie => movie.production_companies
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