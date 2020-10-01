import React, { useState, useEffect } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { Container, H1, Fab, Spinner } from "native-base";
import globalStyles from "../../styles/global";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Income from "../../components/Income";
import useAlert from "../../hooks/useAlert";
import { Ionicons } from "@expo/vector-icons";
import { getIncomesService } from "../../services/incomeService";
import { createExcel } from "../../components/Excel";
import AnimatedButton from "../../components/AnimatedButton";
import { getAllDataService } from "../../services/userService";
import { createExpenseService } from "../../services/expenseService";
import { genericSelectAsync } from "../../db";
import { INCOMES } from "../../utils/storage";
// import PushNotification from "../../components/PushNotification";
// import * as SQLite from "expo-sqlite";
// const db = SQLite.openDatabase("mybudget.db");

const IncomesPage = (props) => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const [incomesList, setIncomesList] = useState([]);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  // const getIncomes = async () => {
  //   setLoading(true);
  //   setIncomesList(await getIncomesService());

  //   setLoading(false);
  // };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      genericSelectAsync(setIncomesList, INCOMES);
      setLoading(false);
      // getIncomes();
    }
    return () => {};
  }, [isFocused]);

  const handleAdd = () => {
    navigation.navigate("NewIncomePage");
  };

  return (
    <Container style={[globalStyles.container]}>
      <View style={[globalStyles.content, { marginTop: 30, flex: 8 }]}>
        <H1 style={globalStyles.title}>Ingresos</H1>
        {incomesList && incomesList.length > 0 ? (
          <SafeAreaView style={{ flex: 5 }}>
            <FlatList
              style={{ flex: 1 }}
              data={incomesList}
              renderItem={({ item }) => <Income item={item} />}
              keyExtractor={(inc, index) => inc.id.toString()}
            />
          </SafeAreaView>
        ) : (
          <H1 style={globalStyles.subtitle}>No tenes Ingresos cargados</H1>
        )}
        <CustomAlert />
      </View>
      <View style={{ flex: 1 }}>
        <Fab
          active={true}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#3700b3" }}
          position="bottomLeft"
          onPress={() => handleAdd()}
        >
          <Ionicons name="md-add" />
        </Fab>
      </View>
      {loading && (
        <View>
          <Spinner color="#000" />
        </View>
      )}
    </Container>
  );
};

export default IncomesPage;
