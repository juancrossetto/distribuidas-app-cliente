import React, { useState } from "react";
import {
  Text,
  Container,
  H1,
  Form,
  Item,
  Input,
  View,
  Spinner,
  CheckBox,
  Body,
  ListItem,
} from "native-base";
import { View as NativeView, Picker, SafeAreaView } from "react-native";
import globalStyles from "../../../styles/global";
import shortid from "shortid";
import { useNavigation } from "@react-navigation/native";
import {
  PaymentMethods,
  ExpenseTypes,
  ExpenseCategories,
  BudgetCategories,
} from "../../../utils/enums";
import useAlert from "../../../hooks/useAlert";
import AnimatedButton from "../../../components/AnimatedButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addItemToList, EXPENSES } from "../../../utils/storage";
import { getCurrentDate, getEmailUserLogged } from "../../../utils";
// import {ImageUploader} from 'react-images-upload';
import ImageUploader from "../../../components/ImageUploader";
import clientAxios from "../../../config/axios";

const NewExpensePage = () => {
  // const [image, setImage] = useState(null);
  const [CustomAlert, setMsg] = useAlert();
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [withFees, setWithFees] = useState(false);
  const [fees, setFees] = useState(0);

  //   const [fees, CounterButtons] = useCounterButtons(1, 1, 12);
  const [voucher, setVoucher] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const createExpense = async (expense) => {
    try {
      setLoading(true);
      const resp = await clientAxios.post(`/expenses/`, expense);
      if (resp) {
        setLoading(false);
        setMsg(`Egreso cargado correctamente`);

        //llamar API actualizar saldo cuenta bancaria (si elegimos esa opcion)

        navigation.navigate("ExpensesPage");
      }
    } catch (error) {
      setMsg(error.response.data.errores[0].msg);
      await addItemToList(EXPENSES, expense);
      setMsg("Egreso guardado en Memoria");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (
      amount <= 0 ||
      paymentType === "" ||
      expenseType === "" ||
      area === ""
    ) {
      setMsg("Todos los campos son obligatorios");
      return;
    }

    if (expenseType === "PER" && category === "") {
      setMsg("Por favor seleccione un categoria de egreso");
      return;
    }
    if (expenseType === "EXT" && detail === "") {
      setMsg("Por favor seleccione un detalle de egreso");
      return;
    }
    if (paymentType === "TRC" && withFees) {
      if (fees < 1 || fees > 12) {
        setMsg("La cantidad de cuotas ingresada no es válida");
        return;
      }
    }

    setLoading(true);
    const date = getCurrentDate();
    const email = await getEmailUserLogged();
    const expense = {
      amount,
      paymentType,
      expenseType,
      detail,
      category,
      fees,
      date,
      area,
      voucher,
      email,
    };
    // expense.id = shortid.generate();
    createExpense(expense);
    setLoading(false);
  };

  return (
    <Container
      style={([globalStyles.container], { backgroundColor: "#E84347" })}
    >
      <View style={[globalStyles.content, { marginTop: 10, flex: 5 }]}>
        <H1 style={globalStyles.subtitle}>Nuevo Egreso</H1>
        {/* <SafeAreaView style={{ flex: 15 }}> */}
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
              selectedValue={paymentType}
              onValueChange={(val) => setPaymentType(val)}
            >
              <Picker.Item label="-- Seleccione un Medio de Pago --" value="" />
              {PaymentMethods.map((item, i) => (
                <Picker.Item label={item.text} value={item.value} key={i} />
              ))}
            </Picker>
          </NativeView>
          <NativeView>
            <Picker
              style={{
                height: 50,
                backgroundColor: "#FFF",
                marginTop: 22,
              }}
              selectedValue={expenseType}
              onValueChange={(val) => setExpenseType(val)}
            >
              <Picker.Item
                label="-- Seleccione un tipo de Egreso --"
                value=""
              />
              {ExpenseTypes.map((item, i) => (
                <Picker.Item label={item.text} value={item.value} key={i} />
              ))}
            </Picker>
          </NativeView>
          {expenseType === "PER" ? (
            <NativeView>
              <Picker
                style={{
                  height: 50,
                  marginTop: 22,
                  backgroundColor: "#FFF",
                }}
                selectedValue={category}
                onValueChange={(val) => setCategory(val)}
              >
                <Picker.Item label="-- Seleccione una Categoría --" value="" />
                {ExpenseCategories.map((item, i) => (
                  <Picker.Item label={item.text} value={item.value} key={i} />
                ))}
              </Picker>
            </NativeView>
          ) : expenseType === "EXT" ? (
            [
              <NativeView
                style={{
                  marginTop: 22,
                }}
                key="0"
              >
                <Item inlineLabel last style={globalStyles.input}>
                  <Input
                    placeholder="Detalle extraordinario"
                    onChangeText={(val) => setDetail(val)}
                  />
                </Item>
              </NativeView>,
            ]
          ) : null}

          <NativeView>
            {paymentType.trim() === "TRC" && (
              <ListItem>
                <CheckBox
                  checked={withFees}
                  color="black"
                  onPress={() => setWithFees(!withFees)}
                />
                <Body>
                  <Text>En cuotas</Text>
                </Body>
              </ListItem>
            )}
            {withFees && paymentType.trim() === "TRC" && (
              <Picker
                style={{
                  height: 40,
                  backgroundColor: "#FFF",
                }}
                selectedValue={fees}
                onValueChange={(val) => setFees(val)}
              >
                <Picker.Item
                  label="-- Seleccione cantidad de Cuotas --"
                  value="0"
                />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
              </Picker>
            )}
          </NativeView>
          <NativeView>
            <Picker
              style={{ marginTop: 22, height: 50, backgroundColor: "#FFF" }}
              selectedValue={area}
              onValueChange={(val) => setArea(val)}
            >
              <Picker.Item label="-- Seleccione un Rubro --" value="" />
              {BudgetCategories.map((item, i) => (
                <Picker.Item label={item.text} value={item.value} key={i} />
              ))}
            </Picker>
          </NativeView>
          <NativeView
            style={{
              marginTop: 22,
            }}
          >
            <ImageUploader image={voucher} setImage={setVoucher} />
          </NativeView>
        </Form>
        {/* </SafeAreaView> */}
        {/* </View> */}
        {/* <View
        style={{
          flex: 1,
        }}
      > */}
        <View style={{ marginTop: 20 }}>
          <AnimatedButton
            text="Guardar Egreso"
            onPress={() => handleSubmit()}
          />
        </View>
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

export default NewExpensePage;
