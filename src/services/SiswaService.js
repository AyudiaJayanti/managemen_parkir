import http from "../http-common"

class SiswaService {
    getAll() {
        return  http.get("/siswa")
    }
    add(siswa) {
        return  http.post("/siswa", {
            'nis': siswa.nis,
            'nama': siswa.nama,
            'no_sim': siswa.noSIM,
            'no_stnk': siswa.noSTNK,
            'jenis': siswa.jenis == 'motor'? 1 : 2,
        })
    }
    edit(siswa) {
        return  http.put("/siswa", {
            'nis': siswa.nis,
            'nama': siswa.nama
        })
    }
    delete(nis) {
        return http.delete("/siswa/" + nis)
    }
}
export default new SiswaService