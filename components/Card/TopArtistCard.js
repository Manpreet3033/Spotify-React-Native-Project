import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const TopArtistCard = ({item}) => {
  return (
    <View style={styles.artistContainer}>
      <Image source={{uri: item.images[0].url}} style={styles.artistImage}/>
      <Text style={styles.artistText}>{item.name}</Text>
    </View>
  )
}

export default TopArtistCard

const styles = StyleSheet.create({
    artistContainer: {
        margin: 10
    },
    artistImage: {
        width: 130,
        height: 130,
        borderRadius: 5,
    },
    artistText: {
        color: "white",
        fontWeight: "500",
        fontSize: 13,
        marginTop: 10
    }
})