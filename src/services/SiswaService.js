import http from "../http-common"

class SiswaService {
    getAll(page) {
        return  http.get("/siswa/page/" + page)
    }
}
export default new SiswaService