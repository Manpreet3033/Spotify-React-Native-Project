import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RecentlyPlayedCardComponent = ({ item }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Info", {
      item: item,
    });
  };
  return (
    <Pressable style={styles.recentPlayedContainer} onPress={handlePress}>
      <Image
        style={styles.recentPlayedImage}
        source={{ uri: item.track.album.images[0].url }}
      />
      <Text numberOfLines={1} style={styles.recentPlayedText}>
        {item?.track?.name}
      </Text>
    </Pressable>
  );
};

export default RecentlyPlayedCardComponent;

const styles = StyleSheet.create({
  recentPlayedContainer: {
    margin: 10,
  },
  recentPlayedImage: {
    width: 130,
    height: 130,
    borderRadius: 5,
  },
  recentPlayedText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 10,
  },
});
