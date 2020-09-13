import React, { useState, useEffect } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Container, H1, Fab, Icon } from "native-base";
import globalStyles from "../../../styles/global";
import { useNavigation } from "@react-navigation/native";
import { getCurrentDate } from "../../../utils";
import useAlert from "../../../hooks/useAlert";
import Loan from "../../../components/Loan";
import { Ionicons } from "@expo/vector-icons";
import { PaymentMethods } from "../../../utils/enums";

const LoansDetailPage = ({ type }) => {
  const [CustomAlert, setMsg] = useAlert();
  const [loansList, setLoansList] = useState([]);
  const loans = [
    {
      amount: 10.0,
      loanType: "REA",
      paymentMethod: "BAN",
      bankAccount: "1234567891",
      date: getCurrentDate(),
      id: "BMUgTPyBr",
    },
    {
      amount: 1500,
      loanType: "TOM",
      paymentMethod: "EFE",
      date: getCurrentDate(),
      id: "BMUgTPyBr2",
    },
  ];
  useEffect(() => {
    setLoansList(loans.filter((l) => l.loanType === type));
  }, []);
  const navigation = useNavigation();

  const handleAdd = () => {
    navigation.navigate("NewLoanPage", { type: type });
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={[globalStyles.content, { marginTop: 30, flex: 8 }]}>
        <H1 style={globalStyles.title}>
          Prestamos {type === "TOM" ? "Tomados" : "Realizados"}
        </H1>
        <ScrollView style={{ flex: 1 }}>
          {loansList.length <= 0 ? (
            <H1 style={globalStyles.subtitle}>
              No tenes prestamos {type === "TOM" ? "Tomados" : "Realizados"}
            </H1>
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={loansList}
              renderItem={({ item }) => <Loan item={item} />}
              keyExtractor={(exp) => exp.id}
            />
          )}
        </ScrollView>
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

export default LoansDetailPage;
