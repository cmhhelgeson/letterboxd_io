import {
    GraphQLInt,
    ThunkObjMap,
    GraphQLFieldConfig,
    GraphQLString,
    GraphQLObjectType
} from "graphql"

type TMDBCompanyType = {
    description?: string,
    headquarters?: string,
    homepage?: string,
    id?: number,
    logo_path?: string,
    name?: string,
    origin_country?: string,
}

type CompanyTypeKeys = 
    "description" |
    "headquarters" | 
    "homepage" | 
    "id" |
    "logoImage" |
    "name" | 
    "originCountry" | 
    "parentCompany"


type CompanyFieldsType = () => ThunkObjMap<GraphQLFieldConfig<
    TMDBCompanyType,
    TMDBCompanyType,
    TMDBCompanyType
>>



export const CompanyType = (withoutKeys?: CompanyTypeKeys[]) => {
    let name: string
    let description: string
    let companyFields: CompanyFieldsType

    let tempFields: any = {
        description: {
            type: GraphQLString,
            resolve: (company: TMDBCompanyType) => company.description
        },
        headquarters: {
            type: GraphQLString,
            resolve: (company: TMDBCompanyType) => company.headquarters
        },
        homepage: {
            type: GraphQLString,
            resolve: (company: TMDBCompanyType) => company.homepage
        },
        id: {
            type: GraphQLInt,
            resolve: (company: TMDBCompanyType) => company.id
        },
        logoImage: {
            type: GraphQLString,
            resolve: (company: TMDBCompanyType) => company.logo_path
        },
        name: {
            type: GraphQLString,
            resolve: (company: TMDBCompanyType) => company.name
        },
    }
    //Normal Language Type
    if (!withoutKeys || withoutKeys.length === 0) {
        name = "Company"
        description = "Query company information"
        companyFields = () => (tempFields)
        
        return new GraphQLObjectType({
            name: name,
            description: description,
            fields: companyFields()
        })

    }

    //Define LanguageType with excluded properties
    const keysString = withoutKeys.join("");
    name = `Company_Without_${keysString}`
    description = `Query company information without ${withoutKeys}`
    for (let i = 0; i < withoutKeys.length; i++) {
        delete tempFields[withoutKeys[i]];
    }

    console.log("Excluding fields");
    console.log(tempFields);

    companyFields = () => (tempFields)
    
    return new GraphQLObjectType({
        name: name,
        description: description,
        fields: companyFields()
    })
}