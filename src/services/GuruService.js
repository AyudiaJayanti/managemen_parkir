import http from "../http-common"

class GuruService {
    getAll() {
        return http.get("/guru")
    }
    add(guru) {
        return  http.post("/guru", {
            'nip': guru.nip,
            'nama': guru.nama,
            'no_sim': guru.noSIM,
            'no_stnk': guru.noSTNK,
            'jenis': guru.jenis == 'motor'? 1 : 2,
        })
    }
    edit(guru) {
        return  http.put("/guru", {
            'nip': guru.nip,
            'nama': guru.nama
        })
    }
    delete(nip) {
        return http.delete("/guru/" + nip)
    }
}

export default new GuruService