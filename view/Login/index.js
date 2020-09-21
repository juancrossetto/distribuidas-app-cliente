import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Container, Spinner, Text, H1, Input, Form, Item } from "native-base";
import globalStyles from "../../styles/global";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import useAlert from "../../hooks/useAlert";
import clientAxios from "../../config/axios";
import AnimatedButton from "../../components/AnimatedButton";
import { saveItem, getItem, USERLOGGED, clearAll } from "../../utils/storage";

const LoginPage = () => {
  // State del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    isUserCatched();
  }, [isFocused]);

  const isUserCatched = async () => {
    const user = await getItem(USERLOGGED);
    if (user) {
      navigation.navigate("Home");
    }
  };

  const initUserConfiguration = async () => {
    console.log("iniciamooo");
  };
  const login = async () => {
    try {
      // const resp = await clientAxios.get(`/users/${email}`);
      const resp = await clientAxios.post(`/auth/`, {
        email,
        password,
      });
      if (resp.data.user) {
        await saveItem(USERLOGGED, {
          id: resp.data.user._id,
          email: resp.data.user.email,
          name: resp.data.user.name,
          password: resp.data.user.password,
        });
        // Logica al Loguearse
        await initUserConfiguration();
        navigation.navigate("Home");
      } else {
        setMsg("El usuario indicado no se encuentra registrado");
      }
    } catch (error) {
      console.log(error);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.msg
      ) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Error al intentar loguearse, revise su conexión");
      }
      // console.log(error);
      // console.log(error.response);
      // if (error.response.data.msg) {
      //   setMsg(error.response.data.msg);
      // } else if (error.response.data.errores) {
      //   setMsg(error.response.data.errores[0].msg);
      // }
    }
  };
  // Cuando el usuario presiona en iniciar sesión.
  const handleSubmit = async () => {
    //validar
    if (email === "" || password === "") {
      // Mostrar un error
      setMsg("Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      // autenticar el usuario
      login();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>OrganizApp</H1>
        <Form>
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
          text="Iniciar Sesión"
          onPress={() => handleSubmit()}
          disabled={loading}
        />
        {loading && <Spinner color="white" />}
        <Text
          onPress={() => navigation.navigate("CreateAccount")}
          style={globalStyles.link}
        >
          Crear Cuenta
        </Text>
        <CustomAlert />
      </View>
    </Container>
  );
};

export default LoginPage;
