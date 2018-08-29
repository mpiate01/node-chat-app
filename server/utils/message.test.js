const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./message')

const msg = {
    from: 'Ciao',
    text: 'Pirla',
    latitude: 105 ,
    longitude: 9999
}

describe('generateMessage', () => {
    it('should generate correct message object', () => {

        const message = generateMessage(msg.from, msg.text)
        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from : msg.from, text:msg.text})
    })
})


describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {

        const message = generateLocationMessage(msg.from, msg.latitude, msg.longitude)
        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from:msg.from, url: 'https://www.google.com/maps?q=105,9999' })
    })
})