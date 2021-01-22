import React from 'react';
import { StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

const MenuItem = ({ title, icon, onPress, color }) => {
    return (
        <TouchableOpacity style={{ ...Styles.menuItem, backgroundColor: color }} onPress={onPress}>
            <Image source={icon} style={Styles.icon}/>
            <Text style={Styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const Styles = StyleSheet.create({
    menuItem: {
        width: Dimensions.get("window").width / 2,
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