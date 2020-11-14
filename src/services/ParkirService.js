import http from "../http-common"

class ParkirService {
    masuk(id) {
        return http.post("/parkir/enter", {
            'visitor_id': id
        })
    }
    keluar(id) {
        return http.post("parkir/exit", {
            'visitor_id': id
        })
    }
}

export default new ParkirService