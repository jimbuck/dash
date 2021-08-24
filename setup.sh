npx create-nx-workspace dash --name dash --preset empty --nx-cloud true --style scss
cd dash

npm i -D @nrwl/next @nrwl/express

npx nx g @nrwl/next:app ui
npx nx g @nrwl/express:application server --frontendProject=ui
