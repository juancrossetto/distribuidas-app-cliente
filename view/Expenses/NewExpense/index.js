import React, { useState, useEffect } from "react";
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
// import shortid from "shortid";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  PaymentMethods,
  ExpenseTypes,
  ExpenseCategories,
  BudgetCategories,
} from "../../../utils/enums";
import useAlert from "../../../hooks/useAlert";
import AnimatedButton from "../../../components/AnimatedButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCurrentDateISO8601, getEmailUserLogged } from "../../../utils";
import ImageUploader from "../../../components/ImageUploader";
import {
  createExpenseInMemory,
  createExpenseService,
} from "../../../services/expenseService";
import { getBankAccountsService } from "../../../services/bankAccountService";
import { getCreditCardsService } from "../../../services/creditCardService";
import { genericSelectAsync } from "../../../db";
import { BANKACCOUNTS, CREDITCARDS } from "../../../utils/storage";

const NewExpensePage = () => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [withFees, setWithFees] = useState(false);
  const [fees, setFees] = useState(1);

  const [bankAccounts, setBankAccounts] = useState([]);
  const [creditCards, setCreditCards] = useState([]);

  const [voucher, setVoucher] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    initializeData();

    return () => {};
  }, [isFocused]);

  const initializeData = async () => {
    // await getBankAccounts();
    // await getCreditCards();
    genericSelectAsync(setBankAccounts, BANKACCOUNTS);
    genericSelectAsync(setCreditCards, CREDITCARDS);
    setLoading(false);
  };
  const getBankAccounts = async () => {
    setBankAccounts(await getBankAccountsService());
  };

  const getCreditCards = async () => {
    setCreditCards(await getCreditCardsService());
  };

  const createExpense = async (expense, bankAccountBalance) => {
    setLoading(true);
    // const resp = await createExpenseService(expense);
    const resp = await createExpenseInMemory(expense, bankAccountBalance);
    if (resp.isSuccess) {
      setMsg(resp.data);
      navigation.navigate("ExpensesPage");
    } else {
      if (resp.data) {
        setMsg(resp.data);
      }
    }
    setLoading(false);
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
    if (paymentType === "TRC" && paymentId === "") {
      setMsg("Por favor Seleccione una Tarjeta de Crédito");
      return;
    }
    if (paymentType === "TRD" && paymentId === "") {
      setMsg("Por favor Seleccione una Tarjeta de Débito");
      return;
    }
    if (paymentType === "BAN" && paymentId === "") {
      setMsg("Por favor Seleccione una Cuenta de Banco");
      return;
    }
    setLoading(true);
    const date = getCurrentDateISO8601(); //new Date();
    let bankAccountDescription = "";
    let bankAccountBalance = 0;
    if (paymentType === "BAN") {
      const bank = bankAccounts.filter((b) => b.id === parseInt(paymentId))[0];
      bankAccountBalance = bank.balance;
      bankAccountDescription = bank.alias.toString();
    }
    const expense = {
      amount,
      paymentType,
      expenseType,
      detail,
      category,
      bankAccountDescription,
      fees,
      date,
      area,
      voucher,
      email: await getEmailUserLogged(),
      paymentId,
    };
    // expense.id = shortid.generate();
    createExpense(expense, bankAccountBalance);
    setLoading(false);
  };

  return (
    <Container style={[globalStyles.container]}>
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
            {(paymentType.trim() === "TRC" ||
              paymentType.trim() === "TRD" ||
              paymentType.trim() === "BAN") && (
              <Picker
                style={{
                  height: 50,
                  backgroundColor: "#FFF",
                  marginTop: 22,
                }}
                selectedValue={paymentId}
                onValueChange={(val) => setPaymentId(val)}
              >
                <Picker.Item
                  label="-- Seleccione la fuente de cobro --"
                  value=""
                />
                {(() => {
                  if (paymentType.trim() === "TRC") {
                    return creditCards?.map((item, i) => (
                      <Picker.Item
                        label={item?.number.toString()}
                        value={item?.number.toString()}
                        key={i}
                      />
                    ));
                  }
                  if (paymentType.trim() === "TRD") {
                    return bankAccounts?.map((item, i) => (
                      <Picker.Item
                        label={item?.debitCard.toString()}
                        value={item?.debitCard.toString()}
                        key={i}
                      />
                    ));
                  } else {
                    return bankAccounts?.map((item, i) => (
                      <Picker.Item
                        label={`${item?.alias.toString()}  (${item?.cbu.toString()})`}
                        value={item?.id.toString()}
                        key={i}
                      />
                    ));
                  }
                })()}
              </Picker>
            )}
          </NativeView>
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
        <View style={{ marginTop: 20 }}>
          <AnimatedButton
            disabled={loading}
            text="Guardar Egreso"
            onPress={() => handleSubmit()}
          />
        </View>
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

export default NewExpensePage;
