import axios from "axios"

const api = axios.create({
  baseURL: "https://localhost:44328/api/alunos",
})

export default api
