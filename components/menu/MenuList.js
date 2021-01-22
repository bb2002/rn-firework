import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MenuItem from './MenuItem';

const backgroundColors = [
    "#ED4C67",
    "#F79F1F",
    "#FFC312",
    "#A3CB38",
    "#0652DD",
    "#1B1464",
    "#006266",
    "#6F1E51"
]

const MenuList = ({ titles, icons, eventHandlers, length }) => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={Styles.menuContainer}>
                {
                    function () {
                        const menuItems = []

                        for(let i = 0; i < length; ++i) {
                            menuItems.push(<MenuItem 
                                title={titles[i]}
                                icon={icons[i]}
                                onPress={eventHandlers[i]}
                                color={backgroundColors[i % backgroundColors.length]}
                                key={i} />)
                        }

                        return menuItems
                    }()
                }
            </ScrollView>
        </View>
        
    );
};

const Styles = StyleSheet.create({
    menuContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
})

export default MenuList;