import React, { useState } from "react";
import { Container, H1, Form, Item, Input, View, Spinner } from "native-base";
import { View as NativeView, Picker } from "react-native";
import globalStyles from "../../../styles/global";
import shortid from "shortid";
import { useNavigation } from "@react-navigation/native";
import { BudgetCategories } from "../../../utils/enums";
import useAlert from "../../../hooks/useAlert";
import AnimatedButton from "../../../components/AnimatedButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getEmailUserLogged } from "../../../utils";
import { addItemToList, BUDGETS } from "../../../utils/storage";
import clientAxios from "../../../config/axios";

const NewBudgetPage = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  // const [bankAccount, setBankAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [CustomAlert, setMsg] = useAlert();

  const createBudget = async (budget) => {
    try {
      setLoading(true);
      const resp = await clientAxios.post(`/budgets/`, budget);

      if (resp) {
        setLoading(false);
        setMsg(`Presupuesto cargado correctamente`);

        navigation.navigate("BudgetsPage");
      }
    } catch (error) {
      if (error.response.data.msg) {
        setMsg(error.response.data.msg);
      } else if (error.response.data.errores) {
        setMsg(error.response.data.errores[0].msg);
      } else {
        await addItemToList(BUDGETS, budget);
        setMsg("Presupuesto guardado en Memoria");
      }
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (amount <= 0) {
      setMsg("El monto debe ser superior a 0");
      return;
    }
    if (category.trim() === "") {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const email = await getEmailUserLogged();
    const budget = { amount, category, email };
    // budget.id = shortid.generate();
    budget.date = new Date();
    createBudget(budget);
    setLoading(false);
  };
  return (
    <Container
      style={([globalStyles.container], { backgroundColor: "#E84347" })}
    >
      <View style={globalStyles.content}>
        <H1 style={globalStyles.subtitle}>Nuevo Presupuesto</H1>
        <Form>
          <NativeView>
            <Item inlineLabel last style={globalStyles.input}>
              <MaterialCommunityIcons name="cash-usd" size={24} color="green" />
              <Input
                keyboardType="numeric"
                placeholder="Monto"
                onChangeText={(val) => setAmount(val)}
              />
            </Item>
          </NativeView>
          <NativeView>
            <Picker
              style={{
                height: 50,
                backgroundColor: "#FFF",
              }}
              selectedValue={category}
              onValueChange={(val) => setCategory(val)}
            >
              <Picker.Item label="-- Seleccione un Rubro --" value="" />
              {BudgetCategories.map((item, i) => (
                <Picker.Item label={item.text} value={item.value} key={i} />
              ))}
            </Picker>
          </NativeView>
        </Form>
        <AnimatedButton
          text="Guardar Presupuesto"
          onPress={() => handleSubmit()}
        />
        {loading && (
          <NativeView>
            <Spinner color="white" />
          </NativeView>
        )}
      </View>
      <CustomAlert />
    </Container>
  );
};

export default NewBudgetPage;
