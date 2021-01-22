import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@firework.user"

export const saveUser = async (user) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export const readUser = async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEY)

    if(value == null) {
        return null
    } else {
        return JSON.parse(value)
    }
}