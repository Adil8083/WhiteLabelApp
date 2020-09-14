import React, { useState } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";

import ImageList from "../components/ImageList";
import MovieInput from "../components/MovieInput";
import SocialComponents from "../components/SocialComponents";

function ActorWEScreen() {
  const [imageUris, setImageUris] = useState([]);
  const [movieInput, setMovieInput] = useState();
  const [movieList, setMovieList] = useState([]);

  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
  };
  const onChange = (val) => {
    setMovieInput(val);
  };
  const addingMovie = () => {
    setMovieList([...movieList, movieInput]);
    alert("Your Movie " + movieInput + " Added");
  };
  console.log(movieList);
  return (
    <View>
      <View>
        <Text style={styles.text}>Add Your Movies</Text>
        <ImageList
          imageUris={imageUris}
          onAddImage={handleAdd}
          onRemoveImage={handleRemove}
        />
        <Text style={styles.text}>Add Your Top 3 Movies</Text>
        <MovieInput onChange={onChange} addMovie={addingMovie} />
      </View>
      <View style={styles.social}>
        <Text style={styles.text}>Add Your Account</Text>
        <SocialComponents title="facebook" colors="lightblue" />
        <SocialComponents title="instagram" colors="purple" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 30,
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  social: {
    paddingTop: 50,
  },
});

export default ActorWEScreen;
