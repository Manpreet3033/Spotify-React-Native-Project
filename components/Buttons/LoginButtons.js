import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const LoginButton = ({ color, text, icon, txtColor, onPress }) => {
    return (

        <Pressable style={[styles.spotifyBtn, { backgroundColor: color }]} onPress={onPress}>
            {icon}
            <Text style={[styles.btnText,{color: txtColor}]}>{text}</Text>
        </Pressable>

    )
}

export default LoginButton

const styles = StyleSheet.create({
    spotifyBtn: {
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto",
        width: 300,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginVertical: 10,
        borderColor: "#C0C0C0",
        borderWidth: 0.8,
    },
    btnText: {
        fontWeight: "500",
        textAlign: "center",
        flex: 1
    }
})