# RecepToo

A Slack notification page made to run on an iPad in your office's reception area.

This version of my reception app (RecepBot) but built on Node.js/Express instead of Ruby/Sinatra.

## What It does

RecepToo shows three buttons to the user to account for three common reasons for office visitors:
1. Package delivery
2. No appointment
3. Appointment

Based on the user's responses, we contact the necessary people through Slack. If the user has an appointment, he/she can start typing their contact's name and a drop-down will appear showing Slack's user list for the given group. Once they announce themselves a notification will go directly to that user, and another to the channel specified. Other alerts just go to the channel. The channel can be the '#general' channel, or a custom one.

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

3) Enter a name for the Bot (like receptoo)

4) You will receive a API token that starts with 'xoxb-'

5) Place that token in the correct line of `server.js`
