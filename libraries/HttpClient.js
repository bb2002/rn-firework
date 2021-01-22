import axios from "axios"

export const adminLoginPasswordClient = ({ username, password }) => axios.post("", { username, password })