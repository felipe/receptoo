# RecepToo

A simple Slack notifiyer to run on an iPad in your office's reception area.

This is a version of my simple reception app (RecepBot) but built on Node.js/Express instead of Ruby/Sinatra.

## What It does

RecepToo shows three buttons to the user to account for three common reasons for office visitors:
1. Package delivery
2. No appointment
3. Appointment

Based on the user's responses, we contact the necessary people through Slack.

## Installation

1. Place Slack Bot token on line 10 of `server.js`
2. Place Slack Channel Name on line 11 of `server.js`
3. From the CLI, install node dependencies:
    `$ npm install --production`
4. From the CLI, run the server:
    `$ node server.js`

### Creating a Slack Bot Token

1) Go to the Slack App Directory, Build your own, Custom Integration

https://[slack-name].slack.com/apps/build/custom-integration

2) Select "Bots"

3) Enter a name for the Bot (like recepbot)

4) You will receive a API token that starts with 'xoxb-'

5) Please provide us with that token
