import React, { useState } from "react";
import { View, Text, Picker } from "react-native";
import { Container, H1, Spinner } from "native-base";
import globalStyles from "../../styles/global";
import AnimatedButton from "../../components/AnimatedButton";
import { getAllDataService } from "../../services/userService";
import { createExcel } from "../../components/Excel";
import useAlert from "../../hooks/useAlert";

const DownloadDataInExcelPage = () => {
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [CustomAlert, setMsg] = useAlert();

  const getAllData = async () => {
    setLoading(true);
    const resp = await getAllDataService();
    setLoading(false);
    createExcel(resp.data);
    return resp;
  };
  const handlePress = () => {
    if (year.trim() === "") {
      setMsg("Por favor Seleccione el Año");
      return;
    }
    getAllData();
  };

  return (
    <Container style={[globalStyles.container]}>
      <View style={{ marginHorizontal: 5, flex: 2, marginTop: 30 }}>
        <H1 style={globalStyles.subtitle}>
          Descarga de Información en formato Excel
        </H1>
        <View>
          <Picker
            style={{
              height: 50,
              backgroundColor: "#FFF",
              marginHorizontal: 10,
            }}
            selectedValue={year}
            onValueChange={(e) => setYear(e)}
          >
            <Picker.Item label="-- Seleccione un Año --" value="" />
            <Picker.Item label={"2020"} value={"2020"} />
            <Picker.Item label={"2021"} value={"2021"} />
            <Picker.Item label={"2022"} value={"2022"} />
          </Picker>
        </View>
        <View style={{ marginTop: 20 }}>
          <AnimatedButton
            disabled={loading}
            text="Descargar Excel"
            onPress={() => handlePress()}
          />
        </View>
      </View>

      {loading && (
        <View>
          <Spinner color="#000" />
        </View>
      )}
      {/* {year ? <View style={[{ flex: 8 }]}></View> : null} */}
      <CustomAlert />
    </Container>
  );
};

export default DownloadDataInExcelPage;
