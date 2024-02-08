import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import RecentlyPlayed from "../components/RecentlyPlayedSongs/RecentlyPlayed";
import TopArtists from "../components/Top-Artists/TopArtists";
import RecentlyPlayedCard from "../components/Card/RecentlyPlayedCard";
import RecentlyPlayedCardComponent from "../components/Card/RecentlyPlayedCardComponent";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    getProfile();
  }, []);

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const [recentlyPlayedSong, setRecentlyPlayedSong] = useState([]);

  const getRecentlyPlayed = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    if (!accessToken) {
      console.log("Access Token not Found");
      navigation.navigate("Login");
      return;
    }
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/recently-played?limit=5",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const tracks = response.data.items;
      setRecentlyPlayedSong(tracks);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  const greetMessage = greetingMessage();

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

  console.log(userProfile);
  return (
    <LinearGradient
      colors={["#040306", "#131624"]}
      style={styles.gradientContainer}
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.topNavOuterContainer}>
          <View style={styles.topNav}>
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
            <Text style={styles.greetMessage}>{greetMessage}</Text>
          </View>
          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            size={24}
            color="white"
          />
        </View>
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Music</Text>
          </Pressable>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Podcasts & Shows</Text>
          </Pressable>
        </View>
        <View style={{ height: 10 }} />
        <View style={styles.songContainer}>
          <Pressable
            style={styles.songBtnContainer}
            onPress={() => {
              navigation.navigate("Liked");
            }}
          >
            <LinearGradient colors={["#33006F", "#FFFFFF"]}>
              <Pressable style={styles.songBtn}>
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>

            <Text style={styles.songText}>Liked Songs</Text>
          </Pressable>
          <View style={styles.songBtnContainer}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.songImage}
            />
            <View style={styles.randomArtist}>
              <Text style={styles.songText}>Hiphop Tamhiza</Text>
            </View>
          </View>
        </View>

        <RecentlyPlayed recentlyPlayed={recentlyPlayedSong} />

        <TopArtists />

        <View style={{ height: 10 }} />

        <Text style={styles.recentlyPlayedText}>Recently Played</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recentlyPlayedSong}
          renderItem={({ item, index }) => (
            <RecentlyPlayedCardComponent item={item} key={index} />
          )}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    marginTop: 60,
  },
  profileIcon: {
    width: 50,
    height: 50,
    marginLeft: 20,
    borderRadius: 20,
    resizeMode: "cover",
  },
  greetMessage: {
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
    fontSize: 20,
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
  },
  topNavOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    padding: 10,
    backgroundColor: "#282828",
    borderRadius: 30,
  },
  btnText: {
    fontSize: 15,
    color: "white",
  },
  btnContainer: {
    marginHorizontal: 12,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  songBtn: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  songBtnContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: "#202020",
    elevation: 3,
  },
  songText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  randomArtist: {},
  songImage: {
    width: 55,
    height: 55,
  },
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  recentlyPlayedText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
