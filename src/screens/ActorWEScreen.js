import React, { useState } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import AppText from "../components/AppText";

import MovieInput from "../components/MovieInput";
import MovieModal from "../components/MovieModal";
import SocialComponents from "../components/SocialComponents";

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
    <View>
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
        <SocialComponents title="facebook" backgroundColor="#4e89ae" />
        <SocialComponents title="instagram" backgroundColor="#ed6663" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  social: {
    paddingTop: 50,
  },
});

export default ActorWEScreen;
