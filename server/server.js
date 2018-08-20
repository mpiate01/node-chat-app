const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '../public')
const app = express()
const port = process.env.PORT || 3000

//middleware

//*Serving static files in Express
app.use(express.static(publicPath))


// app.get('/', (req, res) => {
//     res.send('HEllo world')
// })


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

