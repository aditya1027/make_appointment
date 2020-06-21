const express = require('express');
const connectDB = require('./config/db');
const path =require('path');
const app = express();

//Connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));


//Define routes
app.use('/users', require('./routes/api/users'));
app.use('/auth', require('./routes/api/auth'));
app.use('/serviceproviders', require('./routes/api/serviceprovider'))
app.use('/appointments', require('./routes/api/appointments'));

//Serve static assets in production
if(process.env.NODE_ENV ==='production'){
	//Set static folder
	app.use(express.static('frontend/build'));
	
	app.get('*',(req,res) => {
		res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
	});
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);

});
