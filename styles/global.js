import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: "2.5%",
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 32,
    fontWeight: "bold",
    color: "#3700B3",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 26,
    fontWeight: "bold",
    color: "#3700B3",
    marginTop: 20,
  },
  input: {
    backgroundColor: "#FFF",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#28303B",
    marginTop: 20,
  },
  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#3700B3",
  },
  link: {
    color: "#8252c2",
    marginTop: 60,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
  },
});

export default globalStyles;
