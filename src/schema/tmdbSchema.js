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
import { getPersonMovieCredits, PersonType } from "./personSchema.js";

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

/* const getPersonMovieCredits = (id) => {
    axios.get(`${url}person/${id}/movie_credits?api_key=${API_KEY}`).then((res) => {
        console.log(res.data.cast);
        return [...res.data.cast, ...res.data.crew];
    })
} */


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
                    let person = res.data;
                    person.credits = getPersonMovieCredits(person.id)
                    return person;
                })
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})
