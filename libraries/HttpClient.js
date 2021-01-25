import axios from "axios"
import { HttpClientConfig } from "./Config"

export const adminLoginPasswordClient = ({ username, password }) => axios.post(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/auth/login`, { username, password })

export const sendMyLocationClient = ({ uuid, phoneNumber, status }) => axios.post(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/user/add_situation`, { uuid, phoneNumber, status })

export const getBuildingMainPage = (uuid) => axios.get(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/user/building_main_image/${uuid}`)

export const getEscapeMapClient = (uuid) => axios.get(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/admin/information/${uuid}`)

export const getTelephoneListClient = (uuid) => axios.post(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/user/managerlist`, {uuid})