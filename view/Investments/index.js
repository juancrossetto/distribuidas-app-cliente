import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { Container, H1, Fab, Spinner } from "native-base";
import globalStyles from "../../styles/global";
import Investment from "../../components/Investment";
import { getEmailUserLogged } from "../../utils";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import useAlert from "../../hooks/useAlert";
import { getInvestmentsService } from "../../services/investmentService";

const InvestmentsPage = (props) => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [investmentsList, setInvestmentsList] = useState([]);

  const getInvestments = async () => {
    setLoading(true);
    setInvestmentsList(await getInvestmentsService());
    setLoading(false);
    // try {
    //   const email = await getEmailUserLogged();
    //   const resp = await clientAxios.get(`/investments/${email}`);
    //   if (resp.data.investments) {
    //     setInvestmentsList(resp.data.investments);
    //   } else {
    //     setInvestmentsList(await getItem(INVESTMENTS));
    //   }
    // } catch (error) {
    //   setInvestmentsList(await getItem(INVESTMENTS));
    // }
  };

  useEffect(() => {
    getInvestments();
    return () => {};
  }, [props, isFocused]);

  const handleAdd = () => {
    navigation.navigate("NewInvestmentPage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      {loading ? (
        <View>{/* <Spinner color="white" /> */}</View>
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
