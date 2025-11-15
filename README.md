# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown 
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![desktop view](public/assets/screenshot/desktop%20view.png)
![desktop view](public/assets/screenshot/desktop%20view%201.png)
![mobile view](public/assets/screenshot/mobile%20view.png)
![mobile view](public/assets/screenshot/mobile%20view%201.png)
![mobile view](public/assets/screenshot/mobile%20view%202.png)
![loading view](public/assets/screenshot/loading%20view.png)
![error view](public/assets/screenshot/error%20view.png)

### Links

- Solution URL: [solution](https://github.com/kholidirfangi/weather-app)
- Live Site URL: [live site](https://weather-app-amber-seven-14.vercel.app/)

## My process
- Setup project with Vite, React, Typescript, and Tailwindcss
- Create folder structure
- Create mobile first UI
- Create Logic
- Fetch API
- And also many error and coffee... hehe

I start this project setup using vite as a build tools and I using typescript for programming language, tailwindcss for styling and React for the frontend library.

First I create ui before the interactivity. I create ui with mobile first, and then adapt with tablet and desktop view. After the ui is done, the i continue to create the interactivity such as hover, click, and more. In this phase I learn logic and how to use React and Typescript a lot. How to define types in typescript. I learn interface anf type, also how to use Hooks in React, such as useState, useEffect, useMemo, and useReducer. And I also learn how to create clear folder structure. And then i learn how to fetch api from openmeteo. In this phase I spent more time to solve the problem. Because in this phase I can't directly use url from open meteo. I need geocoding to get name the city and country. And I also need to create switch mode between metric or imperial mode. And how to handle error state and more.


### Built with

- Semantic HTML5 markup
- Tailwindcss
- Flexbox
- CSS Grid
- Mobile-first workflow
- React
- Typescript
- Vite
- Open Meteo
- [React](https://reactjs.org/) - JS library
- [Typescript](https://www.typescriptlang.org/) - JS with types syntax
- [Tailwindcss](https://tailwindcss.com/) - CSS Framework
- [Vite](https://vite.dev/) - Build Tool
- [Open-Meteo](https://open-meteo.com/) - Weather API

### What I learned

I learn a lot from this challenge. And this is some major
- First I learn how to setup project and create a good folder structure
- Then I learn hooks in React, such as useState, useEffect, useReducer adn useMemo
- Then how to define types in typescript, this is my first experience use Typescript
- And make sure good view in mobile, desktop, and tablet devices
- And the biggest challenging is how to consume API and combine with typescript, in this part I spend a lot of time, and I feel happy after finished this challenge.

### Continued development

This challenge is so good for my experience, but I realize this is not enough. So therefore I will create a new project and learn again. This is a journey. I will continue to next trip..

## Author

- Website - [Kholid Irfangi](https://new-portfolio-lovat-kappa.vercel.app/)
- Frontend Mentor - [@kholidirfangi](https://www.frontendmentor.io/profile/kholidirfangi)
- LinkedIn - [@kholidirfangi](https://www.linkedin.com/in/kholid-irfangi-4394a71a6/)


