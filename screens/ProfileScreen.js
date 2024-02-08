import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState();
  const [playList, setPlayList] = useState([]);
  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      setUserProfile(data);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("token");
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setPlayList(response.data.items);
      } catch (err) {
        console.log(err.message);
      }
    };
    getPlaylists();
  }, []);

  console.log(playList);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 60 }}>
        <View style={{ padding: 12 }}>
          <View
            style={{
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            {userProfile?.images[0] ? (
              <Image
                style={styles.profileIcon}
                source={{ uri: userProfile.images[0].url }}
              />
            ) : (
              <Avatar
                containerStyle={{
                  marginLeft: 20,
                  height: 50,
                  width: 50,
                  backgroundColor: "gray",
                }}
                size={"medium"}
                rounded
                title={`${userProfile?.display_name[0]}`}
              />
            )}
            <View>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                {userProfile?.display_name}
              </Text>
              <Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>
                {userProfile?.email}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "500",
            marginHorizontal: 50,
          }}
        >
          Your PlayLists
        </Text>
        <View
          style={{
            padding: 15,
          }}
        >
          {playList.map((item, index) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8,marginVertical: 8,marginHorizontal: 35 }}
            >
              <Image
                source={{
                  uri: item?.images[0]?.url || "https://i.pravatar.cc/100",
                }}
                style={{ width: 50, height: 50, borderRadius: 4 }}
              />
              <View>
                <Text style={{ color: "white" }}>{item?.name}</Text>
                <Text style={{ color: "gray", marginTop: 7 }}>0 Followers</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileIcon: {
    width: 50,
    height: 50,
    marginLeft: 20,
    borderRadius: 20,
    resizeMode: "cover",
  },
});
