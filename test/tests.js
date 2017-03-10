const chai = require('chai')
const mockery = require('mockery')
const slack = require('./mocks/slack')

mockery.registerMock('@slack/client', slack)
mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
})

const SlackAlert = require('./../slack_alert')

describe('SlackAlert', function() {
  describe('new istance', function() {
    it('should instanciate with object', function() {
      chai.expect(SlackAlert({
        name: 'foo',
        token: 'token'
      })).to.be.an.instanceof(SlackAlert)
    })

    it('should instanciate with array', function() {
      chai.expect(SlackAlert([{
        name: 'foo',
        token: 'token'
      }])).to.be.an.instanceof(SlackAlert)
    })

    it('should set the default with object', function() {
      let sa = SlackAlert({
        name: 'foo',
        token: 'token'
      })

      chai.expect(sa).to.have.property('default').and.equal('foo')
    })

    it('should set the default with array', function() {
      let sa = SlackAlert([{
        name: 'foo',
        token: 'token',
        default: true
      }])

      chai.expect(sa).to.have.property('default').and.equal('foo')
    })

    it('should set the property default by using method bot', function() {
      let sa = SlackAlert([{
        name: 'foo',
        token: 'token'
      }])

      chai.expect(sa.bot('foo')).to.have.property('default').and.equal('foo')
    })

    it('should send a message', function() {
      let sa = SlackAlert({
        name: 'foo',
        token: 'token',
        channel: '#test'
      })

      sa.send('test')

      let chat = sa.bots['foo'].slack.chat

      chai.expect(chat).to.have.property('message').and.equal('test')
      chai.expect(chat).to.have.property('channel').and.equal('#test')
    })

    it('should send a message with another bot', function() {
      let sa = SlackAlert([{
        name: 'foo',
        token: 'token',
        channel: '#test'
      }])

      sa.bot('foo').send('test')

      let chat = sa.bots['foo'].slack.chat

      chai.expect(chat).to.have.property('message').and.equal('test')
      chai.expect(chat).to.have.property('channel').and.equal('#test')
    })
  })
})