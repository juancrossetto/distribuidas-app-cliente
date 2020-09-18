import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, SafeAreaView } from "react-native";
import { Container, H1, Fab, Spinner } from "native-base";
import globalStyles from "../../styles/global";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Income from "../../components/Income";
import useAlert from "../../hooks/useAlert";
import { Ionicons } from "@expo/vector-icons";
import { saveItem, getItem, INCOMES } from "../../utils/storage";
import clientAxios from "../../config/axios";
import { getEmailUserLogged } from "../../utils";

const IncomesPage = (props) => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const [incomesList, setIncomesList] = useState([]);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  // const [isMounted, setIsMounted] = useState(true);

  const getIncomes = async () => {
    try {
      //llamamos API, si devuelve OK, pisamos storage, sino usamos el storage.
      const email = await getEmailUserLogged();
      const resp = await clientAxios.get(`/incomes/${email}`);
      if (resp.data.incomes) {
        setIncomesList(resp.data.incomes);
      } else {
        setIncomesList(await getItem(INCOMES));
      }
    } catch (error) {
      setIncomesList(await getItem(INCOMES));
    }
  };

  useEffect(() => {
    // setIsMounted(true);
    // if (isMounted) {
    setLoading(true);
    getIncomes();
    setLoading(false);
    // }

    return () => {
      //   setIsMounted(false);
    };
  }, [props, isFocused]);

  const handleAdd = () => {
    navigation.navigate("NewIncomePage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={[globalStyles.content, { marginTop: 30, flex: 8 }]}>
        <H1 style={globalStyles.title}>Ingresos</H1>
        {incomesList && incomesList.length > 0 ? (
          <SafeAreaView style={{ flex: 5 }}>
            <FlatList
              style={{ flex: 1 }}
              data={incomesList}
              renderItem={({ item }) => <Income item={item} />}
              keyExtractor={(inc) => inc.id}
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
          style={{ backgroundColor: "#f4511e" }}
          position="bottomLeft"
          onPress={() => handleAdd()}
        >
          <Ionicons name="md-add" />
        </Fab>
      </View>
      {loading && (
        <View>
          <Spinner color="white" />
        </View>
      )}
    </Container>
  );
};

export default IncomesPage;
