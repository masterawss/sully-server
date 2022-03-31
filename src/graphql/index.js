// import { DateTimeResolver } from 'graphql-scalars';
import {loadSchemaSync} from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import {loadFilesSync} from '@graphql-tools/load-files'
import path from 'path';
// load from a single schema file
export const schema = loadSchemaSync('src/graphql/schema.gql', {
    loaders: [new GraphQLFileLoader()]
})

const resolver_arrays = loadFilesSync(path.join(__dirname, '../**/*.resolver.js'))

let resolver = {}
resolver_arrays.forEach((resolves, i) => {
    resolver = {...resolves, ...resolver}
});
export {resolver}


