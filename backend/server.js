if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')

const indexRouter = require('./routes/index')
const projectRouter = require('./routes/projectsRoute')
const userRouter = require('./routes/userRoute')
const testsRouter = require('./routes/tests')
const companiesRouter = require('./routes/companies')
const templatesRouter = require('./routes/templates')
const filesRouter = require('./routes/filesRoute')

app.use(cors())

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	res.setHeader('Access-Control-Expose-Headers', '*')

	next()
})
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/', indexRouter)
app.use('/projects', projectRouter)
app.use('/users', userRouter)
app.use('/tests', testsRouter)
app.use('/companies', companiesRouter)
app.use('/templates', templatesRouter)
app.use('/files', filesRouter)

const mongoose = require('mongoose')
main().catch((err) => console.log(err))

async function main() {
	await mongoose.connect(process.env.DATABASE_URL)
}

app.listen(process.env.PORT || 3001)
