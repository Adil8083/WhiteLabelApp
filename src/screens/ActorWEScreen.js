import React, { useState } from "react";
import { View, StyleSheet, Platform, Text, StatusBar } from "react-native";
import AppText from "../components/AppText";

import MovieInput from "../components/MovieInput";
import MovieModal from "../components/MovieModal";
import SocialComponents from "../components/SocialComponents";
import { SCREENS } from "../constants/Screens";

function ActorWEScreen() {
  const [movieInput, setMovieInput] = useState();

  const onChange = (val) => {
    setMovieInput(val);
  };
  const addingMovie = () => {
    setMovieList([...movieList, movieInput]);
    alert("Your Movie " + movieInput + " Added");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Criação</Text>
      <View>
        <View>
          <AppText>Add Your Movies</AppText>
          <MovieModal />
        </View>
        <AppText>Add Your Top 3 Movies</AppText>
        <MovieInput onChange={onChange} addMovie={addingMovie} />
      </View>
      <View style={styles.social}>
        <AppText>Add Your Account</AppText>
        <SocialComponents title="Facebook" width={300} marginTop={30} onPressEvent={() => console.log("Facebook  button is pressed")} />
        <SocialComponents title="Instagram" width={300} marginTop={20} onPressEvent={() => console.log("Instagram  button is pressed")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  }, textStyle: {
    fontSize: 30,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    color: "#696969",
    paddingTop: 30,
    paddingBottom: 10,
  },
  social: {
    paddingTop: 50,
  },
});

export default ActorWEScreen;
