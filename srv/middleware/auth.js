import { decode } from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

module.exports = (req, res, next) => {

    // jwt token eyJ0eXAiOiJCZWFyZXIiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNDUxeDgxMTEzOHo2ejQxMjMiLCJuYW1lIjoiYXBpIHRva2VuIn0.1zj_BGywoaNJ7tZ-Sopl6JGCq28kvjwu4FEKLOKzF2s
    
    try {
        var decoded = jwt_decode(req.headers.authorization)

        if (decoded.sub == "3451x811138z6z4123" && decoded.name == "api token") {
            next()
        } else {
            res.status(401).json({
                'error': 'access denied'
            })
        }
    } catch (err) {
        res.status(401).json({
            'error': 'access denied'
        })
    }
}