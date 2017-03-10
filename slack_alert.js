'use strict'

const EventEmitter = require('events')
const util = require('util')
const Slack = require('@slack/client').WebClient

function SlackAlert(bots) {
  if (!(this instanceof SlackAlert)) {
    return new SlackAlert(bots)
  }

  this.default = null
  this.bots = {}

  if (!(bots instanceof Array)) {
    this.default = bots.name
    bots = [bots]
  }

  for (var i in bots) {
    let bot = bots[i]

    this.bots[bot.name] = {
      slack: new Slack(bot.token),
      channel: bot.channel
    }

    if (bot.default) {
      this.default = bot.name
    }
  }

  EventEmitter.call(this)
}

util.inherits(SlackAlert, EventEmitter)

SlackAlert.prototype.bot = function(bot_name) {
  this.default = bot_name

  return this
}

SlackAlert.prototype.send = function(error, channel) {
  const bot = this.bots[this.default]

  if (error instanceof Error) {
    error = error.toString()
  }

  bot.slack.chat.postMessage(channel || bot.channel, error, (err, res) => {
    if (err) {
      this.emit('error', err)
    } else {
      this.emit('sent', res)
    }
  })

  return this
}

module.exports = SlackAlert