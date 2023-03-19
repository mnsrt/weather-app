# Estonian Weather App
Simple react application that shows the weather in Estonia. The application uses https://www.ilmateenistus.ee to fetch the weather data and OpenStreeMap.

![img_1.png](img_1.webp)


## Scripts

### Running with docker
```docker build -t estonian-weather-app .``` \
```docker run -it --rm -p 3000:3000 estonian-weather-app```


### For development
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

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

