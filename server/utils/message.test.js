const expect = require('expect')
const {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Ciao'
        const text = 'Pirla'
        const message = generateMessage(from, text)
        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from, text})
    })
})