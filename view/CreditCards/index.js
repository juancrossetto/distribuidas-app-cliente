import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList } from "react-native";
import globalStyles from "../../styles/global";
import { Container, H1, Fab } from "native-base";
import useAlert from "../../hooks/useAlert";
import { useNavigation } from "@react-navigation/native";
import styles from "../../components/AnimatedButton/styles";
import { getCurrentDate } from "../../utils";
import CreditCard from "../../components/CreditCard";
import { Ionicons } from "@expo/vector-icons";

const CreditCardsPage = () => {
  const [CustomAlert, setMsg] = useAlert();
  const navigation = useNavigation();
  const [cardsList, setCardsList] = useState([]);
  const [active, setActive] = useState(false);
  useEffect(() => {
    setCardsList([
      {
        number: "4599",
        entity: "Santander",
        dueMonth: "12",
        dueYear: "2020",
        closeDateSummary: "12/10/2020",
        dueDateSummary: "15/10/2020",
        id: "ZMUgTPyBp1",
      },
      {
        number: "3401",
        entity: "Brubank",
        dueMonth: "01",
        dueYear: "2025",
        closeDateSummary: "05/11/2020",
        dueDateSummary: "19/11/2020",
        id: "ZMUgTPyBp2",
      },
      {
        number: "0427",
        entity: "COMAFI",
        dueMonth: "07",
        dueYear: "2023",
        closeDateSummary: "06/11/2020",
        dueDateSummary: "10/11/2020",
        id: "ZMUgTPyBp3",
      },
      {
        number: "0427",
        entity: "Galicia",
        dueMonth: "12",
        dueYear: "2022",
        closeDateSummary: "12/09/2020",
        dueDateSummary: "15/09/2020",
        id: "ZMUgTPyBp4",
      },
    ]);
  }, []);

  const handleAdd = () => {
    navigation.navigate("NewCreditCardPage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={[globalStyles.content, { marginTop: 30, flex: 8 }]}>
        <H1 style={globalStyles.title}>Tarjetas de Crédito</H1>
        <ScrollView style={{ flex: 1 }}>
          {cardsList.length <= 0 ? (
            <H1 style={globalStyles.subtitle}>No posees Tarjetas asociadas</H1>
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={cardsList}
              renderItem={({ item }) => <CreditCard item={item} />}
              keyExtractor={(inc) => inc.id}
            />
          )}
        </ScrollView>
      </View>
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
    </Container>
  );
};

export default CreditCardsPage;
