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
import { getCurrentDateISO8601, getEmailUserLogged } from "../../../utils";
import {
  createBudgetInMemory,
  createBudgetService,
} from "../../../services/budgetService";

const NewBudgetPage = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [CustomAlert, setMsg] = useAlert();

  const createBudget = async (budget) => {
    setLoading(true);
    // const resp = await createBudgetService(budget);
    const resp = await createBudgetInMemory(budget);
    if (resp.isSuccess) {
      setMsg(resp.data);
      navigation.navigate("BudgetsPage");
    } else {
      if (resp.data) {
        setMsg(resp.data);
      }
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (amount <= 0) {
      setMsg("El monto debe ser superior a 0");
      return;
    }
    if (category.trim() === "" || type.trim() === "") {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    const email = await getEmailUserLogged();
    const budget = { amount, category, type, email };
    // budget.id = shortid.generate();
    budget.date = getCurrentDateISO8601(); //new Date();
    createBudget(budget);
    setLoading(false);
  };
  return (
    <Container style={[globalStyles.container]}>
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
          <NativeView>
            <Picker
              style={{
                marginTop: 22,
                height: 50,
                backgroundColor: "#FFF",
              }}
              selectedValue={type}
              onValueChange={(val) => setType(val)}
            >
              <Picker.Item label="-- Seleccione una Categoría --" value="" />
              <Picker.Item label={"Ingreso"} value={"Ingreso"} />
              <Picker.Item label={"Egreso"} value={"Egreso"} />
              <Picker.Item label={"Inversion"} value={"Inversion"} />
              <Picker.Item
                label={"Prestamo Tomado"}
                value={"Prestamo Tomado"}
              />
              <Picker.Item
                label={"Prestamo Realizado"}
                value={"Prestamo Realizado"}
              />
            </Picker>
          </NativeView>
        </Form>
        <AnimatedButton
          text="Guardar Presupuesto"
          onPress={() => handleSubmit()}
        />
        {loading && (
          <NativeView>
            <Spinner color="#000" />
          </NativeView>
        )}
      </View>
      <CustomAlert />
    </Container>
  );
};

export default NewBudgetPage;
