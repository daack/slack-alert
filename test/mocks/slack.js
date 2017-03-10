function SlackMock(token) {
  this.token = token
}

SlackMock.prototype.chat = {
  message: null,
  channel: null,
  postMessage: function(channel, message, cb) {
    this.message = message
    this.channel = channel

    return cb(null, null)
  }
}

module.exports = {
  WebClient: SlackMock
}