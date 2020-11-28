import http from "../http-common"

class TeachersService {
    getAll(page) {
        return  http.get("/guru/page/" + page)
    }
}
export default new TeachersService