import http from "../http-common"

class GuestService {
    getAll() {
        return http.get("/tamu")
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
            "jenis": tamu.jenis == 'motor'? 1 : 2
        })
    }
}

export default new GuestService