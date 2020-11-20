import http from "../http-common"

class SiswaService {
    getAll(page) {
        return http.post("/parkir/" + page)
    }
}

export default new SiswaService