import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, SafeAreaView } from "react-native";
import globalStyles from "../../styles/global";
import { Container, H1, Fab } from "native-base";
import useAlert from "../../hooks/useAlert";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import CreditCard from "../../components/CreditCard";
import { Ionicons } from "@expo/vector-icons";
import { saveItem, getItem, CREDITCARDS } from "../../utils/storage";

const CreditCardsPage = (props) => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [cardsList, setCardsList] = useState([]);

  const getCreditCards = async () => {
    try {
      //llamamos API, si devuelve OK, pisamos storage, sino usamos el storage.
      // saveItem(CREDITCARDS, res);
      // setCardsList(res);
      throw ex;
    } catch (error) {
      const cards = await getItem(CREDITCARDS);
      setCardsList(cards);
    }
  };

  useEffect(() => {
    // setCardsList([
    //   {
    //     number: "4599",
    //     entity: "Santander",
    //     dueMonth: "12",
    //     dueYear: "2020",
    //     closeDateSummary: "12/10/2020",
    //     dueDateSummary: "15/10/2020",
    //     id: "ZMUgTPyBp1",
    //   },
    // ]);
    setLoading(true);
    getCreditCards();
    setLoading(false);
    return () => {};
  }, [props, isFocused]);

  const handleAdd = () => {
    navigation.navigate("NewCreditCardPage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      {loading ? (
        <View>
          <Spinner color="white" />
        </View>
      ) : (
        <View style={[globalStyles.content, { marginTop: 30, flex: 8 }]}>
          <H1 style={globalStyles.title}>Tarjetas de Crédito</H1>
          <SafeAreaView style={{ flex: 5 }}>
            {cardsList && cardsList.length > 0 ? (
              <FlatList
                style={{ flex: 1 }}
                data={cardsList}
                renderItem={({ item }) => <CreditCard item={item} />}
                keyExtractor={(inc) => inc.id}
              />
            ) : (
              <H1 style={globalStyles.subtitle}>
                No posees Tarjetas asociadas
              </H1>
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

export default CreditCardsPage;
