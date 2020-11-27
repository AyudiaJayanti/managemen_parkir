
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user.routes')
const parkirRoutes = require('./routes/parkir.routes')
const siswaRoutes = require('./routes/siswa.routes')
const guruRoutes = require('./routes/guru.routes')
const loginRoutes = require('./routes/login.routes')
const kendaraanRoutes = require('./routes/kendaraan.routes')

const auth = require('./middleware/auth')

export default (app, http) => {
    
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    
    app.options('*', cors())
    
    app.use('/api/parkir', auth, parkirRoutes)
    app.use('/api/siswa', auth, siswaRoutes)
    app.use('/api/guru', auth, guruRoutes)
    app.use('/api/user', auth, userRoutes)
    app.use('/api/kendaraan', auth, kendaraanRoutes)

    app.use('/api/auth', auth, loginRoutes)
    
}