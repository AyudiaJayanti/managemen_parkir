import http from "../http-common"

class UsersService {
    getAll(page) {
        return  http.get("/siswa/page/" + page)
    }
}


export default new UsersService