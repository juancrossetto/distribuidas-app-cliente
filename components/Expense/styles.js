import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  expense: {
    backgroundColor: "#8252c2",
    borderBottomColor: "#fff",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#8252c2",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#e1e1e1",
    // marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "#fff",
  },
  textContainer: {
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
    // justifyContent: 'center',
  },
  image: {
    width: 130,
    height: 130,
    padding: 0,
    margin: 0,
  },
});
export default styles;
