# Healthier
## Your Personal Mental Health Tracker
Healthier is an app for anyone who wants to take care of their mental health. With Healthier, a user can journal, keep track of their moods, and track any habits they'd like to keep up with day to day.

# CONCEPTS
## GOOGLE AUTH
We used google authentication to allow users to sign into our application. All of this was done by using Passport in our server files and creating OAuth 2.0 Client IDs in Google Cloud in the APIs & Services section.

## HOME PAGE
The first page a user sees once they log-in.
Includes these features: A Welcome (user's name)! greeting, a weather component that takes in the user's IP address to get their city, state, and country to get the current daily weather for their area, and buttons to navigate to the main features of the app.
When initially opening the app using local host, many of the features on this page will not work. The Welcome (user's name) won't show up and neither will the weather data. This will show up only on a deployed instance.

## JOURNAL
The journal feature allows a user to add a title to their journal, type their entry, and save it. Once the journal is saved, all journal entries can be seen on the bottom of the page, and it also includes the date the journal was made. You are then able to click a button to read the entry which takes you to a new view of just the journal in its entirety and here you can edit the journal. You can also delete the journal. You can also scroll through and see all the journals a user has made.

## MOODS
The moods feature allows a user to document their mood using a chart. We have 5 standard moods: happy, hopeful, content, worried, and sad. A user is able to click on the specific mood 

## HABITS

Healthier is a full stack web app made with MERN stack with mysql.

This project was created by Alex Hebert, Arina Nasri, Josh Roberts and Patrick Henry as our greenfield project for Operation Spark.

Healthier can be found [here](http://ec2-54-183-105-132.us-west-1.compute.amazonaws.com:8000/)

[Contribution guide](./CONRIBUTING.md)

[Style guide](./STYLE-GUIDE.md)

[Press release](./_PRESS-RELEASE.md)

