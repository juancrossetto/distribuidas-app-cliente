import React, {useState} from 'react';
import {View} from 'react-native';
import {Container, Button, Text, H1, Input, Form, Item} from 'native-base';
import globalStyles from '../../styles/global';
import {useNavigation} from '@react-navigation/native';
import useAlert from '../../hooks/useAlert';

// import AsyncStorage from '@react-native-community/async-storage';

// Apollo
// import {gql, useMutation} from '@apollo/client';

// const AUTENTICAR_USUARIO = gql`
//   mutation autenticarUsuario($input: AutenticarInput) {
//     autenticarUsuario(input: $input) {
//       token
//     }
//   }
// `;

const LoginPage = () => {
  // State del formulario
  const [email, setEmail] = useState('juan@gmail.com');
  const [password, setPassword] = useState('123456');
  const [CustomAlert, setMsg] = useAlert();

  // React Navigation
  const navigation = useNavigation();

  // Mutation de apollo
  //   const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  // Cuando el usuario presiona en iniciar sesión.
  const handleSubmit = async () => {
    //validar
    if (email === '' || password === '') {
      // Mostrar un error
      setMsg('Todos los campos son obligatorios');
      return;
    }

    try {
      // autenticar el usuario
      //   const {data} = await autenticarUsuario({
      //     variables: {
      //       input: {
      //         email,
      //         password,
      //       },
      //     },
      //   });
      //   const {token} = data.autenticarUsuario;
      // Colocar token en storage
      //await AsyncStorage.setItem('token', token);
      // Redireccionar a Proyectos
      navigation.navigate('Home');
      // setMsg(data.autenticarUsuario);
    } catch (error) {
      setMsg(error.message.replace('GraphQL error:', ''));
    }
  };

  return (
    <Container style={[globalStyles.container, {backgroundColor: '#e84347'}]}>
      <View style={globalStyles.content}>
        <H1 style={globalStyles.title}>PresupApp</H1>

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
        <Button
          square
          block
          style={globalStyles.button}
          onPress={() => handleSubmit()}>
          <Text style={globalStyles.buttonText}>Iniciar Sesión</Text>
        </Button>
        <Text
          onPress={() => navigation.navigate('CreateAccount')}
          style={globalStyles.link}>
          Crear Cuenta
        </Text>
        <CustomAlert />
      </View>
    </Container>
  );
};

export default LoginPage;
