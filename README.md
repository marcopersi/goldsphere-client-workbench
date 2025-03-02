![CI](https://github.com/marcopersi/goldsphere/actions/workflows/ci.yml/badge.svg)

# Getting Started with Goldsphere 

Goldsphere is a web application to order gold products from registered and trusted suppliers, where the individual may choose to have a secure delivery or a custody service included. 

Technically the product is implemented with React. 

In the backlog of the project is an extension using HeroUI for nice(r) themeing. However, this might be done in a separate project.

## backend repository 
find the required backend repository here 
https://github.com/marcopersi/goldsphere-server


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3333](http://localhost:3333) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`
well, it lints :-) 


## directory structure
### components: 
contains react components

### src/hooks: 
contains custom hooks.

### src/api.js: 
contains api calls

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

#Build & run the docker Container
docker run -d -p 3000:80 --name goldsphere-frontend goldsphere-frontend


