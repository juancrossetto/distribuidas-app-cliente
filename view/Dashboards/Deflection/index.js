import React, { useState, useEffect } from "react";
import { View, Text, Picker, SafeAreaView, ScrollView } from "react-native";
import { Container, H1, Spinner, Form } from "native-base";
import globalStyles from "../../../styles/global";
import { Months, PaymentMethods } from "../../../utils/enums";
import DeflectionChart from "../../../components/Charts/DeflectionChart";
import { getBudgetDeflection } from "../../../services/budgetService";
import AnimatedButton from "../../../components/AnimatedButton";
import useAlert from "../../../hooks/useAlert";
import {
  BUDGETS,
  EXPENSES,
  INCOMES,
  INVESTMENTS,
  LOANS,
} from "../../../utils/storage";
import {
  getMonthSumGenericAsync,
  getMonthSumGenericWithTypeAsync,
} from "../../../db";
import { getEmailUserLogged } from "../../../utils";

const DeflectionsPage = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [CustomAlert, setMsg] = useAlert();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [incomes, setIncomes] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [investments, setInvestments] = useState(null);
  const [loans, setLoans] = useState(null);
  const [budgets, setBudgets] = useState(null);

  const getEmail = async () => {
    return await getEmailUserLogged();
  };

  const handleSearch = async () => {
    if (month === "" || year === "") {
      setMsg("Por favor complete todos los filtros");
      return;
    }

    setLoading(true);
    // const resp = await getBudgetDeflection(month, year);

    const email = await getEmail();
    await getMonthSumGenericAsync(setIncomes, month, year, email, INCOMES);
    await getMonthSumGenericAsync(
      setInvestments,
      month,
      year,
      email,
      INVESTMENTS
    );
    await getMonthSumGenericAsync(setExpenses, month, year, email, EXPENSES);
    await getMonthSumGenericWithTypeAsync(setLoans, month, year, email, LOANS);
    await getMonthSumGenericWithTypeAsync(
      setBudgets,
      month,
      year,
      email,
      BUDGETS
    );
    // setData(resp.data);
    setLoading(false);
  };
  return (
    <Container style={[globalStyles.container]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={[globalStyles.content]}>
            <View style={{ marginTop: 20 }}>
              <H1 style={globalStyles.title}>Desvío de Presupuestos</H1>
            </View>

            <Form>
              <View>
                <Picker
                  style={{
                    height: 40,
                    backgroundColor: "#FFF",
                    marginHorizontal: 10,
                  }}
                  selectedValue={month}
                  onValueChange={(e) => setMonth(e)}
                >
                  <Picker.Item label="-- Seleccione un Mes --" value="" />
                  {Months.map((item, i) => (
                    <Picker.Item label={item.text} value={item.value} key={i} />
                  ))}
                </Picker>
              </View>
              <View>
                <Picker
                  style={{
                    marginTop: 12,
                    height: 40,
                    backgroundColor: "#FFF",
                    marginHorizontal: 10,
                  }}
                  selectedValue={year}
                  onValueChange={(e) => setYear(e)}
                >
                  <Picker.Item label="-- Seleccione un Año --" value="" />
                  <Picker.Item label="2019" value="2019" />
                  <Picker.Item label="2020" value="2020" />
                  <Picker.Item label="2021" value="2021" />
                </Picker>
              </View>
            </Form>

            <View>
              <AnimatedButton
                disabled={loading}
                text="Buscar Desvíos"
                onPress={() => handleSearch()}
              />
            </View>
            {loading && (
              <View>
                <Spinner color="#000" />
              </View>
            )}
            {incomes || expenses || investments || loans || budgets ? (
              <DeflectionChart
                incomes={incomes}
                expenses={expenses}
                investments={investments}
                budgets={budgets}
                loans={loans}
              />
            ) : (
              // <H1 style={globalStyles.subtitle}>OK</H1>
              <H1 style={globalStyles.subtitle}>
                No se encontro información para el período indicado
              </H1>
            )}
            <CustomAlert />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default DeflectionsPage;
