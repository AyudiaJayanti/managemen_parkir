import http from "../http-common"

class GuruService {
    getAll(page) {
        return http.get("/guru/page/" + page)
    }
}

export default new GuruService