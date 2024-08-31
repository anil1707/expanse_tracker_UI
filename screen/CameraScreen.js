import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useRef, useState } from "react";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";

const CameraScreen = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const [capturedImage, setCapturedImage] = useState();
  const [flash, setFlash] = useState(false);
  const camRef = useRef(null);
  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  const toggleFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };
  const handleClickPick = async () => {
    if (camRef.current) {
      let photo = await camRef.current.takePictureAsync();
      setCapturedImage(photo?.uri);
    }
  };

  const handleFlashMode = () =>{
    setFlash(!flash)
  }

  return (
    <View style={{ width: 350, height: 400 }}>
      {capturedImage ? (
        <View style={{ width: 350, height: 400 }}>
          <Image
            source={{ uri: capturedImage }}
            style={{ width: 350, height: 400 }}
          />
          <Button title="Save"/>
          <Button title="Reclick" onPress={()=> setCapturedImage()} />
        </View>
      ) : (
        <CameraView
          ref={camRef}
          enableTorch={flash}
          style={{ width: "100%", height: "100%" }}
          facing={facing}
        
        >
          <View style={{ flexDirection: "row", gap: 50 }}>
            <Button title="Click" onPress={handleClickPick} />
            <Button title="flip" onPress={toggleFacing} />
            <Button title="Flash" onPress={handleFlashMode}  />
            
          </View>
        </CameraView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default CameraScreen;
