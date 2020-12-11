import http from "../http-common"

class KendaraanService {
    getAll() {
        return http.get("/kendaraan")
    }
    edit(kendaraan) {
        return http.put("/kendaraan", {
            'id': kendaraan.id,
            'owner_id': kendaraan.owner_id,
            'no_stnk': kendaraan.no_stnk,
            'no_sim': kendaraan.no_sim,
            'jenis': kendaraan.jenis == 'motor'? 1 : 2,
        })
    }
    delete(id) {
        return http.delete("/kendaraan/" + id)
    }

    add(kendaraan) {
        return http.post("/kendaraan", {
            'id': '',
            'owner_id': kendaraan.nis != undefined ? kendaraan.nis : kendaraan.nip,
            'no_stnk': kendaraan.noSTNK,
            'no_sim': kendaraan.noSIM,
            'jenis': kendaraan.jenis == 'motor'? 1 : 2,
        })
    }
}


export default new KendaraanService