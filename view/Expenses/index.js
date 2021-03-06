import React, { useState, useEffect } from "react";
import { View, FlatList, ScrollView, SafeAreaView } from "react-native";
import { Container, H1, Fab, Spinner } from "native-base";
import globalStyles from "../../styles/global";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Expense from "../../components/Expense";
import useAlert from "../../hooks/useAlert";
import { Ionicons } from "@expo/vector-icons";
import { saveItem, getItem, EXPENSES } from "../../utils/storage";
import clientAxios from "../../config/axios";
import { getEmailUserLogged } from "../../utils";
import { getExpensesService } from "../../services/expenseService";
import { genericSelectAsync } from "../../db";

const ExpensesPage = (props) => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const [expensesList, setExpensesList] = useState([]);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getExpenses = async () => {
    setLoading(true);
    setExpensesList(await getExpensesService());
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      genericSelectAsync(setExpensesList, EXPENSES);
      setLoading(false);
      // getExpenses();
    }

    return () => {};
  }, [isFocused]);

  const handleAdd = () => {
    navigation.navigate("NewExpensePage", { expenses: expensesList });
  };
  return (
    <Container style={[globalStyles.container]}>
      {!loading ? (
        <>
          <View style={[globalStyles.content, { marginTop: 30, flex: 8 }]}>
            <H1 style={globalStyles.title}>Egresos</H1>
            <SafeAreaView style={{ flex: 5 }} key={1}>
              {!expensesList || expensesList.length <= 0 ? (
                <H1 style={globalStyles.subtitle}>No tenes egresos cargados</H1>
              ) : (
                <FlatList
                  style={{ flex: 1 }}
                  data={expensesList}
                  renderItem={({ item }) => <Expense item={item} />}
                  keyExtractor={(exp) => exp.id}
                />
              )}
            </SafeAreaView>
            <CustomAlert />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Fab
              active={true}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: "#3700B3" }}
              position="bottomLeft"
              onPress={() => handleAdd()}
            >
              <Ionicons name="md-add" />
            </Fab>
          </View>
        </>
      ) : (
        <View>{/* <Spinner color="#000" /> */}</View>
      )}
    </Container>
  );
};

export default ExpensesPage;
