import React, {useState} from 'react';
import {View} from 'react-native';
import {Container, Button, Text, H1, Input, Form, Item} from 'native-base';
import globalStyles from '../../styles/global';
import {useNavigation} from '@react-navigation/native';
import useAlert from '../../hooks/useAlert';

// Apollo
// import {gql, useMutation} from '@apollo/client';

// const NUEVA_CUENTA = gql`
//   mutation crearUsuario($input: UsuarioInput) {
//     crearUsuario(input: $input)
//   }
// `;

const CreateAccountPage = () => {
  // State del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [CustomAlert, setMsg] = useAlert();
  // React Navigation
  const navigation = useNavigation();

  // Mutation de Apollo
  //   const [crearUsuario] = useMutation(NUEVA_CUENTA);

  // Cuando el usuario presiona en crear cuenta
  const handleSubmit = async () => {
    //validar
    if (nombre === '' || email === '' || password === '') {
      // Mostrar un error
      setMsg('Todos los campos son obligatorios');
      return;
    }
    //password al menos 6 caracteres
    if (password.length < 6) {
      setMsg('El password debe ser de al menos 6 caracteres');
      return;
    }
    //guardar el usuario
    try {
      //   const {data} = await crearUsuario({
      //     variables: {
      //       input: {
      //         nombre,
      //         email,
      //         password,
      //       },
      //     },
      //   });
      navigation.navigate('Login');
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
        <Button
          square
          block
          style={globalStyles.button}
          onPress={() => handleSubmit()}>
          <Text style={globalStyles.buttonText}>Crear Cuenta</Text>
        </Button>
        <CustomAlert />
      </View>
    </Container>
  );
};

export default CreateAccountPage;
