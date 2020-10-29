# Maze Monkey
> Web app that allows you to play mazes built with recursive division. There are 3 different difficulties and the leaderboard keeps track of the top scores. 

## Table of contents
* [Project Video](#project-video)
* [Inspiration](#inspiration)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Contact](#contact)

## Project Video
[View demo of Maze Monkey](https://youtu.be/3__Ykxcmi9s)

## Inspiration
For our project, my group and I wanted to create a game to showcase some of the cool features of Javascript. Random maze generation was something that intrigued us and we wanted to learn more about how random mazes are created.

## Technologies
### Backend Development 
* Ruby - version 2.6.1 
* Rails - version 6.0.3
* ActiveRecord - version 6.0
* SQLite3 - version 1.4


### Frontend Development 
* JavaScript (ES6)
* HTML5
* CSS3


## Setup 
1. Clone the GitHub Repository locally to your computer 
1. In the command line, navigate to the root directory of the 'backend' folder/repository, then enter the following: 
$ bundle install 
1. Next, enter the following: 
  $ rails db:migrate
1. Next, enter the following: 
  $ rails db:seed
1. Next, start the server by entering: 
  $ rails s
1. Finally, navigate to the root directory of the 'frontend' folder/repository, then enter the following: 
$ open index.html


## Features
* Full stack web application utilizing Javascript on the frontend and Rails on the backend
* Users can create a username through the application
* Users view the leaderboards and filter the high scores based on difficulty
* Users can view their own high scores
* Users play random mazes of difficulties easy, medium and hard
* Users can delete their scores 
* Users can edit their username and delete their username


## Status
Project is completed with the option to expand functionality and DRY out code.


## Contact
Created by [Colin Mosley](https://www.linkedin.com/in/colin-mosley/) Nandita Venkat and Sohyun Lee. 
Please contact one of us if you have any questions. 
