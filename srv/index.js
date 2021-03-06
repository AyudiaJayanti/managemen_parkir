// import { DESCRIBE } from 'sequelize/types/lib/query-types';

const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user.routes')
const parkirRoutes = require('./routes/parkir.routes')
const siswaRoutes = require('./routes/siswa.routes')
const guruRoutes = require('./routes/guru.routes')
const loginRoutes = require('./routes/login.routes')
const kendaraanRoutes = require('./routes/kendaraan.routes')
const tamuRoutes = require('./routes/tamu.routes')

const auth = require('./middleware/auth')

const socket = require('socket.io')
let io = 1

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
    app.use('/api/tamu', auth, tamuRoutes)
    app.use('/api/auth', auth, loginRoutes)

    io = socket(http, {
        'reconnection delay' : 0, 
        'reopen delay' : 0, 
        'force new connection' : true,
        cors: {
            origin: '*',
        },
        transports: ['websocket', 'polling']
    })
    
    exports.io = io

    io.on('connection', function(socket){
        console.log('connection established by id '+ socket.id)
    })
}
