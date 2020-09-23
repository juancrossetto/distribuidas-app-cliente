import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, SafeAreaView } from "react-native";
import { Container, H1, Fab, Spinner } from "native-base";
import globalStyles from "../../styles/global";
import Budget from "../../components/Budget";
import useAlert from "../../hooks/useAlert";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getBudgetsService } from "../../services/budgetService";

const BudgetsPage = (props) => {
  const [CustomAlert, setMsg] = useAlert();
  const [budgetsList, setBudgetsList] = useState([]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getBudgets = async () => {
    setLoading(true);
    setBudgetsList(await getBudgetsService());
    setLoading(false);
  };

  useEffect(() => {
    getBudgets();
    return () => {};
  }, [props, isFocused]);

  const handleAdd = () => {
    navigation.navigate("NewBudgetPage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#6200EE" }]}>
      {loading ? (
        <View>{/* <Spinner color="white" /> */}</View>
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
              style={{ backgroundColor: "#3700B3" }}
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
