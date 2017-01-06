// Load dependencies
var express = require('express')
var superagent = require('superagent')
var bodyParser = require('body-parser')

// Init Express
var app = express()

// Define base values
var token = 'xoxb-';
var channel = '';

// Define static directory
app.use(express.static('public'))

// Define helpers

// Parse the body of a post request
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: true
}))

// Filter bots and unknown users from Slack
var slackFilter = function (users) {
  var filteredResults = new Array;

  for (var index in users) {
    if(     users[index].is_bot != "true"         // Not a bot
        &&  users[index].deleted != "true"        // Not deleted
        &&  users[index].real_name != "slackbot"  // Not Slackbot
        &&  users[index].real_name != undefined   // Not undefined
        &&  users[index].real_name != "Hello"     // Not named Hello
        &&  users[index].real_name != ""          // Not blank
      )
    {
      filteredResults.push({ label: users[index].real_name, id: users[index].id });
    }
  }
  return filteredResults
}

// Define Routes

// Main Route
app.get('/', function (req, res) {
  res.render('index')
})

// Handle request for team members
app.get('/team', function(req, res) {

  // Fetch Slack user list.
  superagent.get('https://slack.com/api/users.list?token='+token, function(err, ret){
      res.send(slackFilter(ret.body.members))
    })
})

// Handle post for a general message
app.post('/delivery', function(req, res) {
  superagent
    .post('https://slack.com/api/chat.postMessage?token='+token+'&channel='+channel+'&text=Package at reception. Needs Signature.&pretty=1')
    .set('Content-Type', 'application/json; charset=utf-8')
    .end(function(err, ret){
      res.send(ret)
      return true
    })
})

// Handle post for no appointment
app.post('/noappt', function(req, res) {

  // Load query parameters
  var guest_name = req.body.guest_name

  // Post the message to Slack channel
  superagent
    .post('https://slack.com/api/chat.postMessage?token='+token+'&channel='+channel+'&text='+guest_name+' is at reception. No appointment.&pretty=1')
    .set('Content-Type', 'application/json; charset=utf-8')
    .end()

  res.send('OK')
})

// Handle post for appointment
app.post('/appt', function(req, res) {

  // Load query parameters
  var guest_name = req.body.guest_name
  var contact_name = req.body.contact_name
  var contact_id = req.body.contact_id

  // Post the message to the Slack user
  superagent
    .post('https://slack.com/api/chat.postMessage?token='+token+'&channel='+contact_id+'&text='+guest_name+' is at reception looking for you.&pretty=1')
    .set('Content-Type', 'application/json; charset=utf-8')
    .end()

  // Post the message to Slack channel
  superagent
    .post('https://slack.com/api/chat.postMessage?token='+token+'&channel='+channel+'&text='+guest_name+' is at reception looking for '+contact_name+'.&pretty=1')
    .set('Content-Type', 'application/json; charset=utf-8')
    .end()

  res.send('OK')
})

// Run Server
app.listen(8080, function () {
  console.log('RecepToo running on port 8080.')
})
