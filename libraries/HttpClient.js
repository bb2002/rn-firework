import axios from "axios"
import { HttpClientConfig } from "./Config"

export const adminLoginPasswordClient = ({ username, password }) => axios.post(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/auth/login`, { username, password })

export const adminGetBuildingNumber = (token) => axios.post(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/admin/building_number`, { token })

export const sendMyLocationClient = ({ uuid, phoneNumber, status }) => axios.post(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/user/add_situation`, { uuid, phoneNumber, status })

export const getBuildingMainPage = (uuid) => axios.get(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/user/building_main_image/${uuid}`)

export const getEscapeMapClient = (uuid) => axios.get(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/admin/information/${uuid}`)

export const getTelephoneListClient = (uuid) => axios.post(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/user/managerlist`, {uuid})

export const getBuildingNumberClient = (uuid) => axios.get(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/admin/building_number/${uuid}`)

export const stopSendMyLocation = (phoneNumber) => axios.post(`${HttpClientConfig.ROOT_SERVER_ADDRESS}/user/stop_situation`, { phoneNumber })