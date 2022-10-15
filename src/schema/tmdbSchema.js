import axios from "axios";
import { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList
} from "graphql";

import { MovieType } from "./movieSchema.js";


import dotenv from "dotenv"

dotenv.config();

const API_KEY = process.env.TMDB_V3_API_KEY;
const url = process.env.TMDB_V3_ROOT_URL


/*const getPopularPeopleList = (args) => {
    const {startPage, numPages} = args;
    const dummyArray = [];
    for (let i = startPage; i < numPages + 1; i++) {
        axios.get(`${url}person/popular?page=${i}&api_key=${API_KEY}`).then((res) => {
            console.log(res.data.results);
            dummyArray = [...dummyArray, ...res.data.results];
            return dummyArray;
        }).catch(err => {
            console.log("Unable to process request");
            return;
        })
    }
} */

const getPersonMovieCredits = (id) => {
    axios.get(`${url}person/${id}/movie_credits?api_key=${API_KEY}`).then((res) => {
        console.log(res.data.cast);
        return [...res.data.cast, ...res.data.crew];
    })
}


/*const PopularPeopleType = new GraphQLObjectType({
    name: 'PopularPeople',
    description: 'Query for a list of popular people in the film industry',
    fields: () => ({
        results: {
            type: new GraphQLList(PersonType),
            args: {
                startPage: {
                    type: GraphQLInt,
                    defaultValue: 1,
                    description: "Start page for Popular People Query"
                },
                numPages: {
                    type: GraphQLInt,
                    defaultValue: 1,
                    description: "The number of pages containing popular people to read, including the starting page."
                }
            },
            resolve: (people, args) => getPopularPeopleList(args),
        }
    })
}) */






const PersonType = new GraphQLObjectType({
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
        credits: {
            type: new GraphQLList(MovieType),
            resolve: person => getPersonMovieCredits(person.id),
        }
    })
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLInt}},
            resolve(_, args) {
                return axios.get(`${url}movie/${args.id}?api_key=${API_KEY}`).then((res) => {
                    return res.data;
                })
            }
        },
        person: {
            type: PersonType,
            args: {id: {type: GraphQLInt}},
            resolve(_, args) {
                return axios.get(`${url}person/${args.id}?api_key=${API_KEY}`).then((res) => {
                    return res.data;
                })
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})
