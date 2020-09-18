import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, SafeAreaView } from "react-native";
import globalStyles from "../../styles/global";
import { Container, H1, Fab, Spinner } from "native-base";
import useAlert from "../../hooks/useAlert";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import CreditCardCustom from "../../components/CreditCard";
import { Ionicons } from "@expo/vector-icons";
import { getItem, CREDITCARDS } from "../../utils/storage";
import { getEmailUserLogged } from "../../utils";
import clientAxios from "../../config/axios";

const CreditCardsPage = (props) => {
  const isFocused = useIsFocused();
  const [CustomAlert, setMsg] = useAlert();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [cardsList, setCardsList] = useState([]);

  const getCreditCards = async () => {
    try {
      const email = await getEmailUserLogged();
      const resp = await clientAxios.get(`/creditcards/${email}`);
      if (resp.data.creditCards) {
        setCardsList(resp.data.creditCards);
      } else {
        setCardsList(await getItem(CREDITCARDS));
      }
    } catch (error) {
      const cards = await getItem(CREDITCARDS);
      setCardsList(cards);
    }
  };

  useEffect(() => {
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
                renderItem={({ item }) => <CreditCardCustom item={item} />}
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
