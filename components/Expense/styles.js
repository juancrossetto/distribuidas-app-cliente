import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  expense: {
    backgroundColor: "#e1e1e1",
    borderBottomColor: "#fff",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    // marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
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
