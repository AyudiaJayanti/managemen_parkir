import http from "../http-common"

class UsersService {
    getAll() {
        return  http.get("/user")
    }
    add(user) {
        return  http.post("/user", {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'password': user.password,
        })
    }
    edit(user) {
        return  http.put("/user", {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'password': user.password,
        })
    }
    delete(id) {
        return http.delete("/user/" + id)
    }
}


export default new UsersService