import { View, Text, Image } from 'react-native'
import React from 'react'

const EmptyComponent = ({message}) => {
  return (
    <View style={{justifyContent:"center", alignItems:"center"}}>
        <Image source={require("../assets/empty.webp")} style={{width:150, height:150}} />
      <Text style={{fontSize:15, color:"gray"}}>{message || "No data found"}</Text>
    </View>
  )
}

export default EmptyComponent