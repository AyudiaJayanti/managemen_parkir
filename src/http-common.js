import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type"  : "application/json",
    "Authorization" : "Bearer" + "eyJ0eXAiOiJCZWFyZXIiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNDUxeDgxMTEzOHo2ejQxMjMiLCJuYW1lIjoiYXBpIHRva2VuIn0.1zj_BGywoaNJ7tZ-Sopl6JGCq28kvjwu4FEKLOKzF2s"
  }
});
