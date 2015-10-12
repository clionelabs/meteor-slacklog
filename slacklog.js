SlackLog = {
  _token: function() {
    if (Meteor.settings.slackLog && Meteor.settings.slackLog.token) {
      return Meteor.settings.slackLog.token;
    } else {
      throw new Meteor.Error('[SlackLog] missing token settings, i.e. Meteor.settings.slackLog.token');
    }
  },

  _api: function(method, params) {
    var token = this._token();
    var url = 'https://slack.com/api/' + method;
    _.extend(params, {
      token: token
    });
    var response;
    try {
      response = HTTP.post(url, {
        params: params
      });
    } catch (e) {
      throw new Meteor.Error('[SlackLog] Request Error: ' + e);
    }

    if (response.statusCode === 200 && response.data.ok) {
      return response.data;
    } else {
      throw new Meteor.Error('[SlackLog] Improper response: ' + JSON.stringify(response), ", request: ", JSON.stringify(params));
    }
  },

  _createChannel: function(name) {
    var self = this;
    var channel = self._api('channels.create', {name: name});
    return channel;
  },

  _channelByName: function(name, createIfNotExists) {
    var self = this;
    var channelList = self._channels();
    var channel = _.find(channelList, function(channel) {
      return channel.name === name;
    });
    if (channel) {
      return channel;
    }

    if (createIfNotExists) {
      channel = self._createChannel(name);
    }
    return channel;
  },

  _channels: function() {
    var data = this._api('channels.list', {});
    var channelList = data.channels;
    return channelList;
  },

  /*
   * @param {String} channelName
   * @param {Object} options Ref: https://api.slack.com/methods/chat.postMessage
   *                         channel and token will be filled automatically
   */
  log: function(channelName, options) {
    var self = this;
    var channel = self._channelByName(channelName, true);

    var defaultOptions = {
      channel: channel.id,
      as_user: false,
      username: 'SlackLog',
      icon_emoji: ':paperclip:'
    };
    options = _.extend({}, defaultOptions, options);

    self._api('chat.postMessage', options);
  }
}
