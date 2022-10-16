import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLUnionType,
    GraphQLScalarType,
} from "graphql"

import { GenderType } from "./genderSchema.js";

import { MovieType } from "./movieSchema.js"
import axios from "axios"
import { GenreType } from "./genreSchema.js";



export const getPersonMovieCredits = (id) => {
    axios.get(`${process.env.TMDB_V3_ROOT_URL}person/${id}/movie_credits?api_key=${process.env.TMDB_V3_API_KEY}`).then((res) => {
        console.log("Credit data")
        console.log(res.data)
        return res.data;
    })
}


export const CastMovieCreditType = new GraphQLObjectType({
    name: "CastMovieCredit",
    description: "Query person cast credits",
    fields: () => ({
        character: {type: GraphQLString},
        creditId: {
            type: GraphQLString,
            resolve: castCredit => castCredit.credit_id
        },
        releaseDate: {
            type: GraphQLString,
            resolve: castCredit => castCredit.release_date
        },
        voteCount: {
            type: GraphQLInt,
            resolve: castCredit => castCredit.vote_count
        },
        video: {type: GraphQLBoolean},
        adult: {type: GraphQLBoolean},
        voteAverage: {
            type: GraphQLFloat,
            resolve: castCredit => castCredit.vote_average
        },
        title: {type: GraphQLString},
        genreIds: {
            type: new GraphQLList(GenreType),
            resolve: castCredit => castCredit.genre_ids
        },
        originalLanguage: {
            type: GraphQLString,
            resolve: castCredit => castCredit.original_language
        },
        originalTitle: {
            type: GraphQLString,
            resolve: castCredit => castCredit.original_title,
        },
        popularity: {type: GraphQLFloat},
        id: {type: GraphQLInt},
        backdropImage: {
            type: GraphQLString,
            resolve: castCredit => castCredit.backdrop_path
        },
        overview: {type: GraphQLString},
        posterPath: {
            type: GraphQLString,
            resolve: castCredit => castCredit.poster_path
        }
    })
})



export const CrewMovieCreditType = new GraphQLObjectType({
    name: "CrewMovieCredit",
    description: "Query person crew credits",
    fields: () => ({
        id: {type: GraphQLInt},
        department: {type: GraphQLString},
        originalLanguage: {
            type: GraphQLString,
            resolve: crewCredit => crewCredit.original_language
        },
        originalTitle: {
            type: GraphQLString,
            resolve: crewCredit => crewCredit.original_title,
        },
        job: {type: GraphQLString},
        overview: {type: GraphQLString},
        voteCount: {
            type: GraphQLInt,
            resolve: crewCredit => crewCredit.vote_count
        },
        video: {type: GraphQLBoolean},
        posterPath: {
            type: GraphQLString,
            resolve: castCredit => castCredit.poster_path
        },
        backdropImage: {
            type: GraphQLString,
            resolve: castCredit => castCredit.backdrop_path
        },
        title: {type: GraphQLString},
        popularity: {type: GraphQLFloat},
        genreIds: {
            type: new GraphQLList(GenreType),
            resolve: castCredit => castCredit.genre_ids
        },
        voteAverage: {
            type: GraphQLFloat,
            resolve: castCredit => castCredit.vote_average
        },
        adult: {type: GraphQLBoolean},
        releaseDate: {
            type: GraphQLString,
            resolve: crewCredit => crewCredit.release_date
        },
        creditId: {
            type: GraphQLString,
            resolve: crewCredit => crewCredit.credit_id
        }
    })
})

export const PersonMovieCreditType = new GraphQLObjectType({
    name: "PersonMovieCredit",
    description: "Query a person's movie credits",
    fields: () => ({
        id: {type: GraphQLInt},
        cast: {type: new GraphQLList(CastMovieCreditType)},
        crew: {type: new GraphQLList(CrewMovieCreditType)}
    })
})

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
        gender: {type: GenderType},
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
        movieCredits: {
            type: PersonMovieCreditType,
            args: {
                jobFilter: {type: GraphQLString},
                limit: {type: GraphQLInt},
            },
            resolve: (person, args) => {
                const {jobFilter, limit} = args;
                console.log(jobFilter)
                const url = `${process.env.TMDB_V3_ROOT_URL}person/${person.id}/movie_credits?api_key=${process.env.TMDB_V3_API_KEY}`;
                console.log(url);
                return axios.get(url).then((res) => {
                    console.log(res.data);
                    if (jobFilter) {
                        const filteredCrew = res.data.crew.filter(
                            credit => credit.job === jobFilter
                        );
                        const newLimit = limit ? limit : filteredCrew.length;
                        return {
                            id: res.data.id,
                            cast: res.data.cast,
                            crew: filteredCrew.slice(0, newLimit)
                        }
                    }
                })
            }
        }
    })
})
