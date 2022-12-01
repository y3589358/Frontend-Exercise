# Getting Started with Create React App

This Frontend project using ES6, React and material-ui to build a user creation form.

## How to run?

### `npm install`

Before running, you need to install the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Api Call

**| GET    | 'https://frontend-take-home.fetchrewards.com/form'**       
Occupation and State should allow users to select from options returned by an endpoint. Users should only be able to select one occupation and one state, return a JSON body with the following format:

**example: {"occupations": ["occupation1","occupation2"],"states": [{"name": "Alabama","abbreviation": "AL"}]}**

**| POST    | 'https://frontend-take-home.fetchrewards.com/form'**        
Submit the results of the form via a POST request with a JSON body of the following format:

**example: {"name": "???","email": "???","password": "???","occupation": "???","state": "???"}**


