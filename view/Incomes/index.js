import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Container, H1, Fab, Spinner } from "native-base";
import globalStyles from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import Income from "../../components/Income";
import { getCurrentDate } from "../../utils";
import useAlert from "../../hooks/useAlert";
import { Ionicons } from "@expo/vector-icons";
import { saveItem, getItem, INCOMES } from "../../utils/storage";

const IncomesPage = ({}) => {
  const [CustomAlert, setMsg] = useAlert();
  const [incomesList, setIncomesList] = useState([]);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const getIncomes = async () => {
    try {
      //llamamos API, si devuelve OK, pisamos storage, sino usamos el storage.
      // saveItem(SAVE_INCOMES, res);
      // incomesList = res;
      throw ex;
    } catch (error) {
      const incomes = await getItem(INCOMES);
      setIncomesList(incomes);
    }
  };
  useEffect(() => {
    setLoading(true);
    getIncomes();

    setLoading(false);
  });

  const handleAdd = () => {
    navigation.navigate("NewIncomePage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={[globalStyles.content, { marginTop: 30, flex: 8 }]}>
        <H1 style={globalStyles.title}>Ingresos</H1>
        <ScrollView style={{ flex: 1 }}>
          {incomesList.length <= 0 ? (
            <H1 style={globalStyles.subtitle}>No tenes Ingresos cargados</H1>
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={incomesList}
              renderItem={({ item }) => <Income item={item} />}
              keyExtractor={(inc) => inc.id}
            />
          )}
        </ScrollView>
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
