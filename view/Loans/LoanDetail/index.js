import React, { useState, useEffect } from "react";
import { View, FlatList, ScrollView, SafeAreaView } from "react-native";
import { Container, H1, Fab, Icon } from "native-base";
import globalStyles from "../../../styles/global";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import useAlert from "../../../hooks/useAlert";
import Loan from "../../../components/Loan";
import { Ionicons } from "@expo/vector-icons";
// import { PaymentMethods } from "../../../utils/enums";
import { LOANS, getItem, saveItem } from "../../../utils/storage";
import clientAxios from "../../../config/axios";
import { getEmailUserLogged } from "../../../utils";

const LoansDetailPage = ({ type }) => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const [loansList, setLoansList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLoans = async () => {
    try {
      const email = await getEmailUserLogged();
      const resp = await clientAxios.get(`/loans/${email}`);
      console.log(resp.data);
      if (resp.data.loans) {
        setLoansList(resp.data.loans.filter((l) => l.type === type));
      } else {
        const loans = await getItem(LOANS);
        setLoansList(loans.filter((l) => l.type === type));
      }
    } catch (error) {
      const loans = await getItem(LOANS);
      setLoansList(loans.filter((l) => l.type === type));
    }
  };

  useEffect(() => {
    // setLoansList(loans.filter((l) => l.loanType === type));
    setLoading(true);
    getLoans();
    setLoading(false);
    return () => {};
  }, [type, isFocused]);
  const navigation = useNavigation();

  const handleAdd = () => {
    navigation.navigate("NewLoanPage", { type: type });
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      {loading ? (
        <View>
          <Spinner color="white" />
        </View>
      ) : (
        <View style={[globalStyles.content, { marginTop: 30, flex: 8 }]}>
          <H1 style={globalStyles.title}>
            Prestamos {type === "TOM" ? "Tomados" : "Realizados"}
          </H1>
          <SafeAreaView style={{ flex: 5 }}>
            {loansList && loansList.length > 0 ? (
              <FlatList
                style={{ flex: 1 }}
                data={loansList}
                renderItem={({ item }) => <Loan item={item} />}
                keyExtractor={(exp) => exp.id}
              />
            ) : (
              <H1 style={globalStyles.subtitle}>
                No tenes prestamos {type === "TOM" ? "Tomados" : "Realizados"}
              </H1>
            )}
          </SafeAreaView>
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
          <CustomAlert />
        </View>
      )}
    </Container>
  );
};

export default LoansDetailPage;
