import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Container, Spinner } from "native-base";
import globalStyles from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import useAlert from "../../hooks/useAlert";
import { clearAll, USERLOGGED } from "../../utils/storage";

const CloseSessionPage = () => {
  // State del formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CustomAlert, setMsg] = useAlert();
  // React Navigation
  const navigation = useNavigation();

  const clearInfo = async () => {
    await clearAll();
  };
  useEffect(() => {
    clearInfo();
    setTimeout(() => {
      navigation.navigate("Login");
    }, 500);
  }, []);

  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={globalStyles.content}>
        <View>
          <Spinner color="white" />
        </View>
      </View>
    </Container>
  );
};

export default CloseSessionPage;
