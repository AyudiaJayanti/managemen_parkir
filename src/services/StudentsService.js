import http from "../http-common"

class StudentsService {
    getAll(page) {
        return  http.get("/siswa/page/" + page)
    }
}


export default new StudentsService