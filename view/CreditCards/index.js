import React, { useState, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
  FlatList,
} from "react-native";
import globalStyles from "../../styles/global";
import {
  Container,
  H1,
  Header,
  Content,
  Badge,
  Text,
  Icon,
  Fab,
  Button,
} from "native-base";
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
        dueYear: "2015",
        dueDate: "",
        id: "ZMUgTPyBp1",
      },
    ]);
  }, []);

  const handleAdd = () => {
    navigation.navigate("NewCreditCardPage");
  };
  return (
    <Container style={[globalStyles.container, { backgroundColor: "#e84347" }]}>
      <View style={[globalStyles.content, { marginTop: 30 }]}>
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
    </Container>
  );
};

export default CreditCardsPage;
