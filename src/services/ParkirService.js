import http from "../http-common"

class ParkirService {
    masuk(id) {
        return http.post("/parkir/masuk", id)
    }
    keluar(id) {
        return http.post("parkir/keluar", id)
    }
}

export default new ParkirService