import { View, Text, Modal, Button } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import useContactByNumber from "../utils/getContanstDetail";
import { useSelector } from "react-redux";

const SeeFriend = ({ seeFriends, setSeeFriends, friends }) => {
  const userData = useSelector(state => state.profile)
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Modal
        animationType="slide"
        visible={seeFriends}
        onRequestClose={() => setSeeFriends(false)}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          marginTop: 10,
        }}
      >
        <View style={{ marginTop: 10, marginLeft: 10, marginBottom: 20 }}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => setSeeFriends(false)}
          />
          <View
            style={{
              width: 330,
              paddingTop: 20,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
              height: 400,
            }}
          >
            {friends.length &&
              friends.map( (item, index) => {
                return (
                  <Text
                    key={index}
                    style={{
                      backgroundColor: "lightgray",
                      padding: 10,
                      width: "100%",
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  >
                    {item?.name}
                  </Text>
                );
              })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SeeFriend;
