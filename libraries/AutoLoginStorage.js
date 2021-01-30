import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEY = "@firework.autologin"

export const saveToken = async (token) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(token))
}

export const readToken = async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEY)

    if(value == null) {
        return null
    } else {
        return JSON.parse(value)
    }
}

export const removeToken = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY)
}