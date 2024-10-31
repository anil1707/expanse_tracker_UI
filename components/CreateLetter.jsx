import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Keyboard,
    Modal,
  } from "react-native";
//   import React, { useEffect, useRef, useState } from "react";
//   import { useTheme } from "@rneui/themed";
//   import LetterSteps from "../../components/common/composeLetterSteps/LetterSteps";
//   import { Divider } from "@rneui/themed";
//   import { horizontalScale, verticalScale } from "../../utils/responsive.util";
//   import LetterType from "../../components/common/composeLetterSteps/LetterType";
//   import BackgroundColor from "../../components/common/composeLetterSteps/BackgroundColor";
//   import InputField from "../../components/common/inputFields/InputField";
//   import CustomEditor from "../../components/common/composeLetterSteps/richTextEditor/CustomEditor";
//   import Toolbar from "../../components/common/composeLetterSteps/richTextEditor/Toolbar";
//   import StyledButton from "../../components/common/button/StyledButton";
//   import Preview from "../../components/common/composeLetterSteps/Preview";
//   import { Overlay } from "@rneui/base";
// //   import { createLetter } from "../../api/core.api";
//   import axios from "axios";
//   import { BASE_URL } from "../../constants/coreApiUrls";
// import { router } from "expo-router";
  
  const CreateLetter = () => {
    
  
    return (
    //   <ScrollView ref={scrollViewRef} style={styles.scrollView}>
    //     <View
    //       style={{ backgroundColor: theme.colors.white, ...styles.container }}
    //     >
    //       <View style={styles.letterSteps}>
    //         <LetterSteps activeStep={2} pageNumber={3} />
    //       </View>
    //       <View style={styles.dividerContainer}>
    //         <Divider />
    //       </View>
    //       <View style={styles.letterTypeContainer}>
    //         <LetterType />
    //       </View>
    //       <BackgroundColor setBackgroundColor={setBackgroundColor} />
    //       <View style={styles.messageContainer}>
    //         <InputField
    //           style={styles.message}
    //           label={"Message Title *"}
    //           placeholder={"Type here"}
    //         />
    //       </View>
    //       <View ref={editorRef} style={styles.editorContainer}>
    //         <CustomEditor
    //           backgroundColor={backgroundColor}
    //           richText={richText}
    //           initialContentHTML={""}
    //           setTemplate={setHtmlTemplate}
    //           onFocus={() => {
    //             if (!keyboardVisible) {
    //               scrollToEditor();
    //             }
    //           }}
    //         />
    //       </View>
    //       <View>
    //         <Toolbar richText={richText} />
    //       </View>
    //       <View style={styles.previewNextButtonContainer}>
    //         <StyledButton
    //           label={"Preview"}
    //           size="small"
    //           type="outline"
    //           onPress={togglePreview}
    //         />
    //         <StyledButton
    //           label={"Next"}
    //           size="small"
    //           onPress={handleSaveLetter}
    //         />
    //       </View>
    //       {/* Preview letter */}
    //       <Overlay
    //         visible={isPreview}
    //         onBackdropPress={togglePreview}
    //         overlayStyle={[styles.overlayStyle, { borderRadius: 20 }]}
    //         animationType="slide"
    //         backdropStyle={styles.backdropStyle}
    //       >
    //         <Preview
    //           backgroundColor={backgroundColor}
    //           htmlTemplate={htmlTemplate}
    //         />
    //       </Overlay>
    //     </View>
    //   </ScrollView>
    <View>
        <Text>helo</Text>
    </View>
    );
  };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       // alignItems: "center",
//       paddingHorizontal: horizontalScale(7),
//     },
//     scrollView: {
//       width: "100%",
//     },
//     dividerContainer: {
//       marginTop: verticalScale(2),
//     },
//     letterTypeContainer: {
//       marginVertical: verticalScale(2),
//     },
//     messageContainer: { paddingTop: verticalScale(2), paddingBottom: 20 },
//     message: {
//       height: 50,
//       width: horizontalScale(86.5),
//       paddingHorizontal: 0,
//     },
//     editorContainer: { marginTop: verticalScale(2) },
//     previewNextButtonContainer: {
//       flex: 1,
//       flexDirection: "row",
//       justifyContent: "space-between",
//       paddingVertical: verticalScale(2),
//     },
//     overlayStyle: {
//       height: verticalScale(76),
//       width: "100%", // Make the overlay span the entire width
//       position: "absolute", // Position it absolutely
//       bottom: 0, // Align it at the bottom
//       borderRadius: 6,
//     },
//     backdropStyle: {
//       flex: 1,
//       justifyContent: "flex-end",
//       backgroundColor: "rgba(0,0,0,0.5)", // Optional: darken the backdrop
//     },
//     nextButton: {
//       marginBottom: verticalScale(5),
//       alignItems: "center",
//     },
//     gradientOverlay: {
//       ...StyleSheet.absoluteFillObject, // Ensures the gradient fills the overlay
//       borderRadius: 6,
//       // padding: 20,
//     },
//   });
  
  export default CreateLetter;
  