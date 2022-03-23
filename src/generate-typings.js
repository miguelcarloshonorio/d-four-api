"use strict";
exports.__esModule = true;
var graphql_1 = require("@nestjs/graphql");
var posix_1 = require("node:path/posix");
var definitionsFactory = new graphql_1.GraphQLDefinitionsFactory();
definitionsFactory.generate({
    typePaths: ['./src/**/*.graphql'],
    path: (0, posix_1.join)(process.cwd(), 'src/graphql.ts'),
    outputAs: 'class'
});
