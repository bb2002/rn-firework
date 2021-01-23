import React from 'react';
import { StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

const MenuItem = ({ title, icon, onPress, color, bigSizeMode }) => {
    return (
        <TouchableOpacity style={{ ...Styles.menuItem, backgroundColor: color, width: bigSizeMode ? Dimensions.get("window").width : Dimensions.get("window").width / 2 }} onPress={onPress}>
            <Image source={icon} style={Styles.icon}/>
            <Text style={Styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const Styles = StyleSheet.create({
    menuItem: {
        height: Dimensions.get("window").width / 2,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        width: 58,
        height: 58,
        marginBottom: 8
    },
    title: {
        color: "white"
    }
})

export default MenuItem;