import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, SafeAreaView } from "react-native";
import { Container, H1, Fab, Icon } from "native-base";
import globalStyles from "../../styles/global";
import Budget from "../../components/Budget";
import useAlert from "../../hooks/useAlert";
import { Ionicons } from "@expo/vector-icons";
import { getItem, BUDGETS } from "../../utils/storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import clientAxios from "../../config/axios";
import { getEmailUserLogged } from "../../utils";

const BudgetsPage = (props) => {
  const [CustomAlert, setMsg] = useAlert();
  const [budgetsList, setBudgetsList] = useState([]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getBudgets = async () => {
    try {
      const email = await getEmailUserLogged();
      const resp = await clientAxios.get(`/budgets/${email}`);
      console.log(resp);
      if (resp.data.budgets) {
        setBudgetsList(resp.data.budgets);
      } else {
        setBudgetsList(await getItem(BUDGETS));
      }
    } catch (error) {
      setBudgetsList(await getItem(BUDGETS));
    }
  };

  useEffect(() => {
    setLoading(true);
    getBudgets();
    setLoading(false);
    return () => {};
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
