import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, SafeAreaView } from "react-native";
import { Container, H1, Fab, Icon } from "native-base";
import globalStyles from "../../styles/global";
import Budget from "../../components/Budget";
import { getCurrentDate } from "../../utils";
import useAlert from "../../hooks/useAlert";
import { Ionicons } from "@expo/vector-icons";
import { saveItem, getItem, BUDGETS } from "../../utils/storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const BudgetsPage = (props) => {
  const [CustomAlert, setMsg] = useAlert();
  const [budgetsList, setBudgetsList] = useState([]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getBudgets = async () => {
    try {
      //llamamos API, si devuelve OK, pisamos storage, sino usamos el storage.
      // saveItem(BUDGETS, res);
      // setBudgetsList(res);
      throw ex;
    } catch (error) {
      setBudgetsList(await getItem(BUDGETS));
    }
  };

  useEffect(() => {
    // setBudgetsList([
    //   {
    //     amount: 100,
    //     category: "PER",
    //     bankAccount: "1234567891",
    //     date: getCurrentDate(),
    //     id: "ZMUgTPyBp",
    //   },
    //   {
    //     amount: 2500,
    //     category: "EXT",
    //     bankAccount: "2414205416",
    //     date: getCurrentDate(),
    //     id: "ZMUgTPyBf",
    //   },
    //   {
    //     amount: 100,
    //     category: "PER",
    //     bankAccount: "1234567891",
    //     date: getCurrentDate(),
    //     id: "ZMUgTPyBp2",
    //   },
    //   {
    //     amount: 2500,
    //     category: "EXT",
    //     bankAccount: "2414205416",
    //     date: getCurrentDate(),
    //     id: "ZMUgTPyBb",
    //   },
    // ]);
    setLoading(true);
    getBudgets();
    setLoading(false);
  }, [props, isFocused]);

  const handleAdd = () => {
    navigation.navigate("NewBudgetPage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      {loading ? (
        <View>
          <Spinner color="white" />
        </View>
      ) : (
        <View style={[globalStyles.content, { marginTop: 30, flex: 8 }]}>
          <H1 style={globalStyles.title}>Presupuestos</H1>
          <SafeAreaView style={{ flex: 5 }}>
            {budgetsList && budgetsList.length > 0 ? (
              <FlatList
                style={{ flex: 1 }}
                data={budgetsList}
                renderItem={({ item }) => <Budget item={item} />}
                keyExtractor={(inc) => inc.id}
              />
            ) : (
              <H1 style={globalStyles.subtitle}>
                No tenes Presupuestos cargados
              </H1>
            )}
          </SafeAreaView>
          <View style={{ flex: 1 }}>
            <Fab
              active={true}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: "#f4511e" }}
              position="bottomLeft"
              onPress={() => handleAdd()}
            >
              <Ionicons name="md-add" />
            </Fab>
          </View>
          <CustomAlert />
        </View>
      )}
    </Container>
  );
};

export default BudgetsPage;
