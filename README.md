# CRYPTOLOG API

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Project status](#project-status)
* [User Stories](#user-stories)
* [Launch](#launch)

## General info
A full-stack CRUD React app that allows users to maintain a log of all cryptocurrency buy/sell transactions on exchanges that they transact on. We believe that there is a use case here to assist cryptocurrency traders in keeping track of their transactions across multiple exchanges. Front end of project can be accessed [here](https://github.com/benjipt/cryptolog_frontend).

## Technologies
(Back End)
- ExpressJS
- Node.JS
- MongoDB
- Mongoose

## Project status
Complete w/ plans to add future updates/features:
- User can see running profit & loss from their transactions by coin.
- Implement sessions for authentication using JWT.
- Transactions are mapped to specific users.
- User can see their tax owed from profit/loss on each coin & factors for short-term vs. long-term capital gains.
- User can reset password.
- User can validate email.
- Fix known issue: Login Form & New User Form can surface at same time.
- Fix known issue: Transaction does not update automatically on page after edit form submission.
- Fix known issue: password match conditional notification should only render when passwords do not match (briefly renders even when matching).

## User Stories
- Users can add purchase transactions of their respective currency unit at a specific price and time.
- Users can add sell transactions and add the sell price at a specific price and time.
- Users can update and delete any previously added transactions.

## Launch
View [here](https://cryptolog-frontend.herokuapp.com/)