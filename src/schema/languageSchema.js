import { 
    GraphQLObjectType,
    GraphQLString,
    ThunkObjMap,
    GraphQLFieldConfig,
} from "graphql";



/* type TMDBLanguageType = {
    iso_639_1?: string,
    english_name?: string,
    name?: string,
}

type LanguageTypeFields = "iso6391" | "englishName" | "name"


type LanguageFieldsType = () => ThunkObjMap<GraphQLFieldConfig<
    TMDBLanguageType,
    TMDBLanguageType,
    TMDBLanguageType
>> */

/*type MovieLanguageFieldsType = () => ThunkObjMap<GraphQLFieldConfig<
    Omit<TMDBLanguageType, "english_name">, 
    Omit<TMDBLanguageType, "english_name">,
    Omit<TMDBLanguageType, "english_name">
>>


const LanguageFields: LanguageFieldsType = () => ({
    iso6391: {
        type: GraphQLString,
        resolve: language => language.iso_639_1
    },
    englishName: {
        type: GraphQLString,
        resolve: language => language.english_name
    },
    name: {
        type: GraphQLString,
        resolve: language => language.name
    },
})

export const Language = new GraphQLObjectType({
    name: "Language",
    description: "Query language information",
    fields: LanguageFields()
}) */


export const LanguageType = (withoutKeys) => {
    let name
    let description
    let languageFields;

    let tempFields = {
        iso6391: {
            type: GraphQLString,
            resolve: (language) => language.iso_639_1
        },
        englishName: {
            type: GraphQLString,
            resolve: (language) => language.english_name
        },
        name: {
            type: GraphQLString,
            resolve: (language) => language.name
        },
    }
    //Normal Language Type
    if (!withoutKeys || withoutKeys.length === 0) {
        name = "Language"
        description = "Query language information"
        languageFields = () => (tempFields)
        
        return new GraphQLObjectType({
            name: name,
            description: description,
            fields: languageFields()
        })

    }

    //Define LanguageType with excluded properties
    const keysString = withoutKeys.join("");
    name = `Language_Without_${keysString}`
    description = `Query language information without ${withoutKeys}`
    for (let i = 0; i < withoutKeys.length; i++) {
        delete tempFields[withoutKeys[i]];
    }

    console.log("Excluding fields");
    console.log(tempFields);

    languageFields = () => (tempFields)
    
    return new GraphQLObjectType({
        name: name,
        description: description,
        fields: languageFields()
    })
}


