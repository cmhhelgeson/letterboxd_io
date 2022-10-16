import axios from "axios";
import { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLEnumType
} from "graphql";

import { MovieType } from "./movieSchema.js";


import dotenv from "dotenv"
import { getPersonMovieCredits, PersonType } from "./personSchema.js";

dotenv.config();

const API_KEY = process.env.TMDB_V3_API_KEY;
const url = process.env.TMDB_V3_ROOT_URL




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
        },
        popular: {
            type: PersonType, 
            args: {
                startPage: {type: GraphQLInt},
                totalPages: {type: GraphQLInt}
            },
            resolve(_, args) {
                const {startPage, totalPages} = args;
                const pageArr = Array.from(
                    {length: totalPages}, (_, i) => i + 1
                );
                return Promise.all(
                    pageArr.map(pageId => 
                        axios.get(`${url}person/${args.id}?api_key=${API_KEY}&page=${pageId}`)
                    )
                ).then((promises) => {
                    
                })
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})
