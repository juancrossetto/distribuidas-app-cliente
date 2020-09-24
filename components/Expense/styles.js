import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  expense: {
    backgroundColor: "#fff",
    // borderBottomColor: "#fff",
    // borderStyle: "solid",
    borderColor: "#cccccc",
    borderWidth: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: "#8252c2",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    // marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
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
