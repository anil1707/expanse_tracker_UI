import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity style={{backgroundColor:"white", borderRadius:50, width:30, height:30, alignItems:"center", justifyContent:"center"}} onPress={onPress}>
      <AntDesign name="left" size={24} color="green" />
    </TouchableOpacity>
  )
}

export default BackButton