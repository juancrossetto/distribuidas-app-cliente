import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Container, H1, Fab, Icon } from "native-base";
import globalStyles from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import Budget from "../../components/Budget";
import { getCurrentDate } from "../../utils";
import AnimatedButton from "../../components/AnimatedButton";
import useAlert from "../../hooks/useAlert";
import { Ionicons } from "@expo/vector-icons";

const BudgetsPage = ({}) => {
  const [CustomAlert, setMsg] = useAlert();
  const [budgetsList, setBudgetsList] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    setBudgetsList([
      {
        amount: 100,
        category: "PER",
        bankAccount: "1234567891",
        date: getCurrentDate(),
        id: "ZMUgTPyBp",
      },
      {
        amount: 2500,
        category: "EXT",
        bankAccount: "2414205416",
        date: getCurrentDate(),
        id: "ZMUgTPyBf",
      },
      {
        amount: 100,
        category: "PER",
        bankAccount: "1234567891",
        date: getCurrentDate(),
        id: "ZMUgTPyBp2",
      },
      {
        amount: 2500,
        category: "EXT",
        bankAccount: "2414205416",
        date: getCurrentDate(),
        id: "ZMUgTPyBb",
      },
    ]);
  }, []);

  const handleAdd = () => {
    navigation.navigate("NewBudgetPage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={[globalStyles.content, { marginTop: 30, flex: 8 }]}>
        <H1 style={globalStyles.title}>Presupuestos</H1>
        <ScrollView style={{ flex: 1 }}>
          {budgetsList.length <= 0 ? (
            <H1 style={globalStyles.subtitle}>
              No tenes Presupuestos cargados
            </H1>
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={budgetsList}
              renderItem={({ item }) => <Budget item={item} />}
              keyExtractor={(inc) => inc.id}
            />
          )}
        </ScrollView>
        {/* <AnimatedButton text="Agregar" onPress={handleAdd} /> */}
        <CustomAlert />
      </View>
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
    </Container>
  );
};

export default BudgetsPage;
