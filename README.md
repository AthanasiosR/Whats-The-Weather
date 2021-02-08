# Whats-The-Weather

What's the Weather is a weather app that shows the weather ion cities from all over the world using the Openweathermap api

## Features
Can search the weather in cities all over the world

Shows the current weather for the city that you searched for along with some additional information such as:
- feels like
- Weather description (Sunny / cloudy / partly cloudy/ rain / snow)
- Temperature high and low
- Humidity

Also shows the future forecast in three hour intervals

## Instalation
To use the app you need to:

1) Clone the repository and open it up on your computer

2) Then you will need to run the command "yarn install" in the whats-the-weather folder

3) After that you will need to add the date library by writing "yarn add date-fns" into the command line

4) You will also need to have your own Opeweathermap API key for this app to work. the API key could the placed in it's pwn .env file in the root directory or directly in the App.js file at the top where is says const api = { key: } and replaces the process.env link with the API key.

5) Once these steps are done then you could start the app with the command "yarn start"
