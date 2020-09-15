import "react-native-gesture-handler";

import * as React from "react";
import { Button, View, Text, TouchableOpacity, Image } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IncomesPage from "../Incomes";
import ExpensesPage from "../Expenses";
import AmountSpentPage from "../Dashboards/AmountSpent";
import BankAccountBalancePage from "../Dashboards/BankAccountBalance";
import BankAccountsPage from "../BankAccounts";
import InvestmentsPage from "../Investments";
import BudgetsPage from "../Budgets";
import NewIncomePage from "../Incomes/NewIncome";
import NewExpensePage from "../Expenses/NewExpense";
import NewInvestmentPage from "../Investments/NewInvestment";
import NewBankAccountPage from "../BankAccounts/NewBankAccount";
import CreditCardsPage from "../CreditCards";
import LoansPage from "../Loans";
import NewLoanPage from "../Loans/NewLoan";
import NewCreditCardPage from "../CreditCards/NewCreditCard";
import NewBudgetPage from "../Budgets/NewBudget";
import WeekDuesPage from "../Dashboards/WeekDues";
import DeflectionsPage from "../Dashboards/Deflection";
import {
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  Entypo,
  AntDesign,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              "https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png",
          }}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const IncomesStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="IncomesPage">
      <Stack.Screen
        name="IncomesPage"
        component={IncomesPage}
        options={{
          title: "Administra tus Ingresos",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="NewIncomePage"
        component={NewIncomePage}
        options={{
          title: "Nuevo Ingreso",
          // headerRight: () => (
          //   <IncomesPage />
          //   // <NavigationDrawerStructure navigationProps={navigation} />
          // ),
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

function expensesStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="ExpensesPage">
      <Stack.Screen
        name="ExpensesPage"
        component={ExpensesPage}
        options={{
          title: "Administra tus Egresos",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="NewExpensePage"
        component={NewExpensePage}
        options={{
          title: "Nuevo Egreso",
          headerRight: () => <ExpensesPage />,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function investmentsStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="InvestmentsPage">
      <Stack.Screen
        name="InvestmentsPage"
        component={InvestmentsPage}
        options={{
          title: "Administra tus Inversiones",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="NewInvestmentPage"
        component={NewInvestmentPage}
        options={{
          title: "Invertí",
          headerRight: () => <InvestmentsPage />,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

const bankAccountsStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="BankAccountsPage">
      <Stack.Screen
        name="BankAccountsPage"
        component={BankAccountsPage}
        options={{
          title: "Administra tus Cuentas Bancarias",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="NewBankAccountPage"
        component={NewBankAccountPage}
        options={{
          title: "Asocie su Cuenta Bancaria",
          headerRight: () => <BankAccountsPage />,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

const loansStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="LoansPage">
      <Stack.Screen
        name="LoansPage"
        component={LoansPage}
        options={{
          title: "Administra tus Préstamos",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      {/* <Stack.Screen
        name="LoansDetailPage"
        component={LoansDetailPage}
        options={{
          title: "Detalle Préstamo",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      /> */}
      <Stack.Screen
        name="NewLoanPage"
        component={NewLoanPage}
        options={{
          title: "Carga tu préstamo",
          // headerRight: () => <LoansPage />,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

const budgetsStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="BudgetsPage"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="BudgetsPage"
        component={BudgetsPage}
        options={{
          title: "Administra tus Presupuestos",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="NewBudgetPage"
        component={NewBudgetPage}
        options={{
          title: "Carga tu Presupuesto",
          headerRight: () => <BudgetsPage />,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const cardsStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="CreditCardsPage">
      <Stack.Screen
        name="CreditCardsPage"
        component={CreditCardsPage}
        options={{
          title: "Administra tus Tarjetas",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="NewCreditCardPage"
        component={NewCreditCardPage}
        options={{
          title: "Asociando tu Tarjeta",
          headerRight: () => <CreditCardsPage />,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  switch (routeName) {
    case "HomePage":
      return "Home";
    case "ExploreScreen":
      return "Explore";
    case "DashboardTabsStack":
      return "Home";
  }
}
function DashboardTabsStack() {
  return (
    <Tab.Navigator
      initialRouteName="AmountSpentPage"
      tabBarOptions={{
        showIcon: true,
        activeTintColor: "#FFFFFF",
        inactiveTintColor: "#F8F8F8",
        style: {
          backgroundColor: "#f4511e",
        },
        labelStyle: {
          textAlign: "center",
        },
        indicatorStyle: {
          borderBottomColor: "#eee",
          borderBottomWidth: 2,
        },
      }}
    >
      <Tab.Screen
        name="AmountSpentPage"
        component={AmountSpentPage}
        options={{
          tabBarLabel: "Monto gastado",
          tabBarIcon: () => (
            <AntDesign name={"piechart"} size={24} color={"#000"} />
          ),
        }}
      />
      <Tab.Screen
        name="BankAccountBalancePage"
        component={BankAccountBalancePage}
        options={{
          tabBarLabel: "Saldo de cuenta",
          tabBarIcon: () => (
            <AntDesign name="linechart" size={24} color={"#000"} />
          ),
        }}
      />
      <Tab.Screen
        name="WeekDuesPage"
        component={WeekDuesPage}
        options={{
          tabBarLabel: "Vencimientos de la Semana",
          tabBarIcon: () => <EvilIcons name="chart" size={24} color={"#000"} />,
        }}
      />
      <Tab.Screen
        name="DeflectionsPage"
        component={DeflectionsPage}
        options={{
          tabBarLabel: "Desvíos",
          tabBarIcon: () => (
            <FontAwesome5 name="chart-bar" size={24} color={"#000"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DashboardsStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="Inicio"
        component={DashboardTabsStack}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      />
    </Stack.Navigator>
  );
}

function HomePage() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        style: { backgroundColor: "#DFDBDB" }, //gris, cambiar
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        options={{
          drawerLabel: "Inicio",
          drawerIcon: () => (
            <AntDesign name={"areachart"} size={25} color={"#e84347"} />
          ),
        }}
        component={DashboardsStack}
      />
      <Drawer.Screen
        name="Ingresos"
        options={{
          drawerLabel: "Ingresos",
          drawerIcon: () => (
            <MaterialIcons name="attach-money" size={25} color={"#e84347"} />
          ),
        }}
        component={IncomesStack}
      />
      <Drawer.Screen
        name="Egresos"
        options={{
          drawerLabel: "Egresos",
          drawerIcon: () => (
            <MaterialIcons name="money-off" size={25} color={"#e84347"} />
          ),
        }}
        component={expensesStack}
      />
      <Drawer.Screen
        name="BankAccounts"
        options={{
          drawerLabel: "Cuentas Bancarias",
          drawerIcon: () => (
            <FontAwesome name="bank" size={25} color={"#e84347"} />
          ),
        }}
        component={bankAccountsStack}
      />
      <Drawer.Screen
        name="Inversiones"
        options={{
          drawerLabel: "Inversiones",
          drawerIcon: () => (
            <FontAwesome5 name={"piggy-bank"} size={25} color={"#e84347"} />
          ),
        }}
        component={investmentsStack}
      />
      <Drawer.Screen
        name="Presupuestos"
        options={{
          drawerLabel: "Presupuestos",
          drawerIcon: () => (
            <FontAwesome5 name={"newspaper"} size={25} color={"#e84347"} />
          ),
        }}
        component={budgetsStack}
      />
      <Drawer.Screen
        name="Prestamos"
        options={{
          drawerLabel: "Préstamos",
          drawerIcon: () => (
            <Fontisto name="money-symbol" size={25} color={"#e84347"} />
          ),
        }}
        component={loansStack}
      />
      <Drawer.Screen
        name="Tarjetas"
        options={{
          drawerLabel: "Tarjetas",
          drawerIcon: () => (
            <Entypo name="credit-card" size={25} color={"#e84347"} />
          ),
        }}
        component={cardsStack}
      />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}

export default HomePage;
