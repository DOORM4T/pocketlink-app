import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "snow",
    paddingTop: "25%",
    paddingHorizontal: 25,
  },
  textInput: {
    fontSize: 24,
    borderColor: "#2699FB",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 12,
    fontFamily: "OpenSans-Regular",
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    padding: 10,
    elevation: 0.5,
  },
  text: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
  },
});
