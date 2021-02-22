# AzerothCore - Charts
React chart component to display the race and class population.


## Internals
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The chart was done with [AmChart 4](https://www.amcharts.com/).

Inspired by [this model](https://www.amcharts.com/demos/column-chart-images-top/?theme=dark).

## Prerequisite
Create a .env file and fill the properties:
- REACT_APP_API_BASE_URL
- REACT_APP_API_ENDPOINT
- REACT_APP_SERVER_TITLE

The format returned by the API backend should be:
```json
[
  {
    "guid": 34,
    "name": "Lanaya",
    "race": 11,
    "class": 2,
    "gender": 1,
    "level": 19,
    "map": 0,
    "instance_id": 0,
    "zone": 44,
    "guildId": 1,
    "guildName": "The Alliance"
  },
  {
    "guid": 1992,
    "name": "Margareth",
    "race": 7,
    "class": 8,
    "gender": 1,
    "level": 1,
    "map": 0,
    "instance_id": 0,
    "zone": 1,
    "guildId": null,
    "guildName": null
  }
]

```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.