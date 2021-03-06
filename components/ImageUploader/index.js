import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Row } from "native-base";

const ImageUploader = ({ image, setImage }) => {
  useEffect(() => {
    getPermissionAsync();
  }, []);
  const getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (e) {}
  };

  return (
    <View>
      <Button
        title={image ? "Imagen Cargada!" : "Adjuntar Recibo"}
        onPress={pickImage}
        color={image ? "#4BB543" : "#2b6fa6"}
      />
      {/* {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
            marginTop: 10,
          }}
        />
      )} */}
    </View>
  );
};

export default ImageUploader;
