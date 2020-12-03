import http from "../http-common"

class GuestService {
    getAll(page) {
        return http.get("/tamu/page/" + page)
    }
    delete(id) {
        return http.delete("/tamu/" + id)
    }
    edit(tamu) {
        return http.put("/tamu", {
            "id": tamu.id,
            "nama": tamu.nama,
            "instansi": tamu.instansi
        })
    }
    add(tamu) {
        return http.post("/tamu", {
            "nama": tamu.nama,
            "instansi": tamu.instansi,
            "jenis": tamu.jenis
        })
    }
}

export default new GuestService