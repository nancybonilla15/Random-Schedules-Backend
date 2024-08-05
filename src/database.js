const  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/random_schedules-app', {
    
}).then(db => console.log('Database is correctly connected'))
.catch(err => console.log(err))