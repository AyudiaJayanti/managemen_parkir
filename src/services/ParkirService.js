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
    getAll(){
        return http.get("parkir/")
    }

    getAllData(){
        return http.get("/parkir")
    }

    laporan(from, to){
        return http.post("/parkir/laporan", {
            'from' : from,
            'to': to
        })
    }
}

export default new ParkirService