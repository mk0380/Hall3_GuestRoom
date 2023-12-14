const express = require('express')
const env = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const { hallApproval } = require('./controllers/hallApproval')
const { wardenRejection } = require('./controllers/wardenRejection')
const { wardenApproval } = require('./controllers/wardenApproval')
const { fetchData } = require('./controllers/fetchData')
const { setPasswordValidatorOTP } = require('./controllers/setPasswordValidateOTP')
const { setPassword } = require('./controllers/setPassword')
const { passwordChange } = require('./controllers/passwordChange')
const { validateOTP } = require('./controllers/validateOTP')
const { forgetPasword } = require('./controllers/forgetPasword')
const { login } = require('./controllers/login')
const { checkOTP } = require('./controllers/checkOTP')
const { details } = require('./controllers/details')
const { checkDates } = require('./controllers/checkDates')

// git add . git commit -m "" git push 

const app = express();
env.config({})

app.use(cors())

// Without `express.json()`, `req.body` is undefined.
app.use(express.json())

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started...");
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected...");
}).catch((err) => {
    console.log("Error occured while connecting to Database :" + err.message);
})


app.post('/checkDates', checkDates)

app.post('/details', details)

app.post('/checkOTP', checkOTP)

app.post('/login', login)

app.post('/forgetPasword', forgetPasword)

app.post('/validateOTP', validateOTP)

app.post('/passwordChange', passwordChange)

app.post('/setPassword', setPassword)

app.post('/setPasswordValidateOTP', setPasswordValidatorOTP)

app.post('/fetchData', fetchData)

app.post('/wardenApproval', wardenApproval)

app.post('/wardenRejection', wardenRejection)

app.post('/hallApproval', hallApproval)