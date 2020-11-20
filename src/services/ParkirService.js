import http from "../http-common"

class ParkirService {
    masuk(id, jenis) {
        return http.post("/parkir/enter", {
            'visitor_id': id,
            'jenis': jenis
        })
    }
    keluar(id) {
        return http.post("parkir/exit", {
            'visitor_id': id
        })
    }
}

export default new ParkirService