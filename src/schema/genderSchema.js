import { GraphQLEnumType } from "graphql";


export const GenderType = new GraphQLEnumType({
    name: "GenderType",
    values: {
        Unknown: {value: 0},
        Female: {value: 1},
        Male: {value: 2},
        NonBinary: {value: 3}
    }
})