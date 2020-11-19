import http from "../http-common"

class GuestService {
    add(id) {
        return http.post("/", {
            'id': id,
            'nama': nama,
        })
    }
    get(id) {
        return http.get("/:id")
    }
}

export default new GuestService