ARINA
- server/routers/weatherController.js
  - created getWeather function that sent an axios.get request to ip-api to access the user logged in's ip address to access their city, region, and country code
  - then used that information to send an axios.get request to visual crossing's weather api to access the weather data for the user's location
- server/routers/userController.js
  - created getUser function to access the user logged in's information to be able to get the info from their ip address
- server/routers/index.js
  - created user and weather routers
- client/src/fonts
  - downloaded font and made it accessible to the project
- client/src/components/Weather.jsx
  - created weather component to later add to the home page so the user's weather information shows up when they log in
- client/src/components/styles.js
  - created styling of entire application and put the major components in here so everyone could use it throughout their pages
- client/src/components/HomePage.jsx
  - created HomePage component that shows Welcome (user's name), the user's weather info based on where they logged in from, and the buttons to navigate to everyone's feature

ALEX

PATRICK

JOSH

AS A GROUP
- Created initial setup of project
- User authentication