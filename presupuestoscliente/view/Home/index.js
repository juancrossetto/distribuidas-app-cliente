import 'react-native-gesture-handler';

import * as React from 'react';
import {Button, View, Text, TouchableOpacity, Image} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import IncomesPage from '../Incomes';
import ExpensesPage from '../Expenses';
import DashboardPage from '../Dashboard';
import BankAccountsPage from '../BankAccounts';
import InvestmentsPage from '../Investments';
import BugdetsPage from '../Budgets';
import LoansPage from '../Loans';
import NewIncomePage from '../Incomes/NewIncome';
import NewExpensePage from '../Expenses/NewExpense';
import NewInvestmentPage from '../Investments/NewInvestment';

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
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
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

const IncomesStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="IncomesPage">
      <Stack.Screen
        name="IncomesPage"
        component={IncomesPage}
        options={{
          title: 'Administra tus Ingresos', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="NewIncomePage"
        component={NewIncomePage}
        options={{
          title: 'Nuevo Ingreso',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

function expensesStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="ExpensesPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="ExpensesPage"
        component={ExpensesPage}
        options={{
          title: 'Administra tus Egresos',
        }}
      />
      <Stack.Screen
        name="NewExpensePage"
        component={NewExpensePage}
        options={{
          title: 'Nuevo Egreso',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function investmentsStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="InvestmentsPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="InvestmentsPage"
        component={InvestmentsPage}
        options={{
          title: 'Administra tus Inversiones',
        }}
      />
      <Stack.Screen
        name="NewInvestmentPage"
        component={NewInvestmentPage}
        options={{
          title: 'Invertí',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const bankAccountsStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="BankAccounts"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="BankAccounts"
        component={BankAccountsPage}
        options={{
          title: 'Administra tu Cuenta Bancaria',
        }}
      />
    </Stack.Navigator>
  );
};

const budgetsStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Budgets"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Budgets"
        component={BugdetsPage}
        options={{
          title: 'Administra tu Presupuestos',
        }}
      />
    </Stack.Navigator>
  );
};

const loansStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Loans"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Loans"
        component={LoansPage}
        options={{
          title: 'Administra tu Préstamos',
        }}
      />
    </Stack.Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'HomeScreen':
      return 'Home';
    case 'ExploreScreen':
      return 'Explore';
    case 'DashboardTabsStack':
      return 'Home';
  }
}
function DashboardTabsStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#f4511e',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardPage}
        options={{
          tabBarLabel: 'Monto gastado',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="Incomes"
        component={IncomesPage}
        options={{
          tabBarLabel: 'Saldo de cuenta',
        }}
      />
    </Tab.Navigator>
  );
}

function DashboardsStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="Dashboards"
        component={DashboardTabsStack}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
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
        style: {backgroundColor: '#DFDBDB'}, //gris, cambiar
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen
        name="Dashboards"
        options={{drawerLabel: 'Dashboards'}}
        component={DashboardsStack}
      />
      <Drawer.Screen
        name="Ingresos"
        options={{
          drawerLabel: 'Ingresos',
        }}
        component={IncomesStack}
      />
      <Drawer.Screen
        name="Egresos"
        options={{drawerLabel: 'Egresos'}}
        component={expensesStack}
      />
      <Drawer.Screen
        name="BankAccounts"
        options={{drawerLabel: 'Cuentas Bancarias'}}
        component={bankAccountsStack}
      />
      <Drawer.Screen
        name="Inversiones"
        options={{drawerLabel: 'Inversiones'}}
        component={investmentsStack}
      />
      <Drawer.Screen
        name="Presupuestos"
        options={{drawerLabel: 'Presupuestos'}}
        component={budgetsStack}
      />
      <Drawer.Screen
        name="Prestamos"
        options={{drawerLabel: 'Préstamos'}}
        component={loansStack}
      />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}

export default HomePage;
