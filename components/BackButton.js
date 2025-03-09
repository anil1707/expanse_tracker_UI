import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* <AntDesign name="left" size={24} color="green" /> */}
      <Image source={require("../assets/back4.jpg")} style={{width:25, height:8, }} />
    </TouchableOpacity>
  )
}

export default BackButton