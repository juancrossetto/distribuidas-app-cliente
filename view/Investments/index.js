import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { Container, H1, Fab } from "native-base";
import globalStyles from "../../styles/global";
import Investment from "../../components/Investment";
import { getCurrentDate } from "../../utils";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import useAlert from "../../hooks/useAlert";
import { INVESTMENTS, getItem, saveItem } from "../../utils/storage";

const InvestmentsPage = (props) => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [investmentsList, setInvestmentsList] = useState([]);

  const getInvestments = async () => {
    try {
      //llamamos API, si devuelve OK, pisamos storage, sino usamos el storage.
      // saveItem(INVESTMENTS, res);
      // setInvestmentsList(res);
      throw ex;
    } catch (error) {
      const inv = await getItem(INVESTMENTS);
      setInvestmentsList(inv);
    }
  };

  useEffect(() => {
    // setInvestmentsList([
    //   {
    //     type: "Plazo Fijo",
    //     bankAccount: "1234567891",
    //     days: 60,
    //     amount: 1000,
    //     interestRate: 18,
    //     date: getCurrentDate(),
    //     id: "ZMUgTPyBp",
    //   },
    // ]);
    setLoading(true);
    getInvestments();
    setLoading(false);
  }, [props, isFocused]);

  const handleAdd = () => {
    navigation.navigate("NewInvestmentPage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      {loading ? (
        <View>
          <Spinner color="white" />
        </View>
      ) : (
        <View style={[globalStyles.content, { marginTop: 30 }]}>
          <H1 style={globalStyles.title}>Inversiones</H1>
          <SafeAreaView style={{ flex: 5 }}>
            {investmentsList && investmentsList.length > 0 ? (
              <FlatList
                style={{ flex: 1 }}
                data={investmentsList}
                renderItem={({ item }) => <Investment item={item} />}
                keyExtractor={(inc) => inc.id}
              />
            ) : (
              <H1 style={globalStyles.subtitle}>Aún no ha Invertido</H1>
            )}
          </SafeAreaView>
          <View style={{ flex: 1 }}>
            <Fab
              active={true}
              direction="up"
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

export default InvestmentsPage;
