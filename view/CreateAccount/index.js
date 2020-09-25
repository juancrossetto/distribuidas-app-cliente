import React, { useState } from "react";
import { View } from "react-native";
import { Container, H1, Input, Form, Item } from "native-base";
import globalStyles from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import useAlert from "../../hooks/useAlert";
import AnimatedButton from "../../components/AnimatedButton";
import { createAccountService } from "../../services/userService";

const CreateAccountPage = () => {
  // State del formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(false);
  // React Navigation
  const navigation = useNavigation();

  const createAccount = async () => {
    const resp = await createAccountService(nombre, email, password);

    if (resp.isSuccess) {
      setMsg(resp.data);
      navigation.navigate("Login");
    } else {
      setMsg(resp.data);
    }
  };

  const handleSubmit = async () => {
    //validar
    if (nombre === "" || email === "" || password === "") {
      // Mostrar un error
      setMsg("Todos los campos son obligatorios");
      return;
    }
    //password al menos 6 caracteres
    if (password.length < 6) {
      setMsg("El password debe ser de al menos 6 caracteres");
      return;
    }
    //guardar el usuario
    try {
      createAccount();
    } catch (error) {
      setMsg(error.message.replace("GraphQL error:", ""));
    }
  };

  return (
    <Container style={[globalStyles.container]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>My Budget</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Nombre"
              onChangeText={(texto) => setNombre(texto)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Email"
              onChangeText={(texto) => setEmail(texto)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(texto) => setPassword(texto)}
            />
          </Item>
        </Form>
        <AnimatedButton
          text="Crear Cuenta"
          onPress={() => handleSubmit()}
          disabled={loading}
        />

        <CustomAlert />
      </View>
    </Container>
  );
};

export default CreateAccountPage;
