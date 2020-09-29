import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, FlatList } from 'react-native';

import ButtonComponent from "./ButtonComponent";
import { Octicons } from "@expo/vector-icons";
export default function AlbumModal({ album, toggle }) {
    return (
        <Modal isVisible animationType="slide" >
            <Text style={{
                alignSelf: "center", fontWeight: "bold",
                color: "#696969",
                paddingTop: 30,
                marginBottom: 20,
                fontSize: 20
            }}>{album.name}</Text>
            <View>
                <FlatList data={album.Songslist}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <View style={styles.listText}>
                            <Octicons name="primitive-dot" size={15} style={{ marginTop: 4.5 }} color="#696969" />
                            <Text style={{ fontSize: 17, color: "grey", marginLeft: 15 }}>{item}</Text>
                        </View>)} />
                <ButtonComponent title="Close" marginTop={20} onPressEvent={() => toggle(false)} />
            </View>
        </Modal>

    )
}
const styles = StyleSheet.create({
    listText: {
        flexDirection: "row",
        paddingLeft: 45,
        padding: 15,
    },
});