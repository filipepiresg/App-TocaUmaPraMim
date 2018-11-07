import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Thumbnail, Text } from "native-base";

import perfil from "../img/perfil.png";

const { width } = Dimensions.get("window");

const User = ({ user, navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("Artist", { username: user.username, back: true })}
  >
    <View
      style={[
        styles.container,
        { backgroundColor: user.premium ? "rgb(201,153,83)" : "#ccc" }
      ]}
    >
      <Thumbnail
        source={user.photoURL ? { uri: user.photoURL + '?type=large' } : perfil}
        large
        style={styles.imagem}
      />
      <Text
        style={[
          styles.txt,
          {
            fontSize: 20,
            fontWeight: "bold",
            color: user.premium ? "#fff" : "#000"
          }
        ]}
      >
        {user.name}
      </Text>
      <Text style={[styles.txt, { color: user.premium ? "#fff" : "#000" }]}>
        {user.instruments && user.instruments.length > 0
          ? user.instruments[0]
          : ""}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    margin: 10,
    width: (width / 2) - 20,
    flex:1
  },
  txt: {
    textAlign: "center"
  },
  imagem: {
    marginBottom: 10
  }
});

export default User;
