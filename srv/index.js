
const bodyParser = require('body-parser');
const cors = require('cors');

// const userRoutes = require('./routes/user.routes')
const parkirRoutes = require('./routes/parkir.routes')
const siswaRoutes = require('./routes/siswa.routes')
const guruRoutes = require('./routes/guru.routes')

var corsOptions = {
    origin: "http://localhost:8081"
};

export default (app, http) => {
    
    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // app.use('/api/users', userRoutes)
    app.use('/api/parkir', parkirRoutes)
    app.use('/api/siswa', siswaRoutes)
    app.use('/api/guru', guruRoutes)

}
