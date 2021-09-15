npx create-nx-workspace dash --name dash --preset empty --nx-cloud true --style scss
cd dash

npm i -D @nrwl/next @nrwl/express nx-electron eslint-plugin-unicorn

# Setup Apps
npx nx g @nrwl/next:app ui
npx nx g @nrwl/express:application server --frontendProject=ui
npx nx g nx-electron:app desktop --frontendProject=ui

# Setup GraphQL
npm i typedi type-graphql graphql reflect-metadata apollo-server-express subscriptions-transport-ws @graphql-tools/schema

# TypegraphQL

# Setup Libraries
npx nx generate @nrwl/workspace:lib models --linter eslint
npx nx generate @nrwl/workspace:lib utils --linter eslint
npx nx generate @nrwl/workspace:lib dal --linter eslint
npx nx generate @nrwl/workspace:lib graphql --linter eslint

# GraphQL Codegen
npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/introspection @graphql-codegen/time @graphql-codegen/near-operation-file-preset @graphql-codegen/typescript-apollo-client-helpers @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo


# Create codegen.yml and configure it to generate app code based on .graphql files
