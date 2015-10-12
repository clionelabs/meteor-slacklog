# SlackLog
This package provides a convenient way to send messages to your Slack channels

# Why do you need this
We use this on our own projects mainly for the followings:

  - Notify ourselves when interesting events happen, i.e. new user sign up
  - Alert ourselves when something went wrong, i.e. server error

Traditionally, we do normal console.log on server, and then check our logs regularly. However, the process is usually very annoying and not in real-time. Since our team uses slack heavily internally for communication, we find that something like `slack.log()` would be much more convenient than `console.log()`, where the former will simply send the log message to our slack channel.

# Usage
1. In the slack api dashboard - `https://api.slack.com/web`, generate an access token

2. Add the generated access token in meteor settings. i.e. In Meteor.settings, add

  ```
  {
    slackLog: API_TOKEN
  }
  ```

3. Now, you are ready to go, simply do:

  ```
  SlackLog.log(CHANNEL_NAME, {
    text: 'hello slack'
  });
  ```

`CHANNEL_NAME` is the name of the channel where you want the message to deliver to. If the channel doesn't exists, it will be created automatically.

Internally, we call the `chat.postMessage` api, so you can also specify other parameters other than simply text, Ref: `https://api.slack.com/methods/chat.postMessage`
