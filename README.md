# slack-alert :rotating_light:

Slack Bot alert message

* [Install](#install)
* [Example](#example)
* [API](#api)
* [Events](#events)

<a name="install"></a>

## Install

To install slack-alert, simply use npm:

```
npm install slack-alert --save
```

<a name="example"></a>

## Example

```javascript
const SlackAlert = require('slack-alert')

let alert = SlackAlert({
	name: 'bot',
	token: 'token',
	channel: '#channel'
})

alert.send(new Error('error'))

// multiple bots

let alert = SlackAlert([{
  name: 'foo',
  token: 'token',
  channel: '#channel'
}, {
  name: 'bar',
  token: 'token',
  channel: '#channel'
}])

alert.bot('foo').send(new Error('error'))

// different channel

alert.bot('foo').send(new Error('error'), '#another_channel')
```

<a name="api"></a>

## API

  * <a href="#constructor"><code><b>SlackAlert()</b></code></a>
  * <a href="#bot"><code>instance.<b>bot()</b></code></a>
  * <a href="#send"><code>instance.<b>send()</b></code></a>

-------------------------------------------------------
<a name="constructor"></a>

### SlackAlert(bots)

Creates a new instance of SlackAlert.

-------------------------------------------------------
<a name="bot"></a>

### instance.bot(bot_name)

Change the current bot

-------------------------------------------------------
<a name="send"></a>

### instance.send(error[, channel])

Send a new error to slack

* `error`, Error object or a string
* `channel`, Slack channel

<a name="events"></a>

## Events

  * <a href="#error"><code><b>error</b></code></a>
  * <a href="#sent"><code><b>sent</b></code></a>

-------------------------------------------------------
<a name="error"></a>

### instance.on('error', (err) => {})

-------------------------------------------------------
<a name="sent"></a>

### instance.on('sent', (slack_confirm) => {})