import React, { useState } from "react";
import {
  Icon,
  Input,
  Grid,
  Col,
  Button,
  Content,
  Form,
  Container,
  Item,
} from "native-base";
import globalStyles from "../styles/global";

const useCounterButtons = (initialState, minCount, maxCount) => {
  const [count, setCount] = useState(initialState);

  const handleIncrease = () => {
    if (count < maxCount) {
      const nuevaCount = parseInt(count + 1);
      setCount(nuevaCount);
      console.log("nuevaCount", nuevaCount);
    }
  };

  const handleDecrease = () => {
    if (count > minCount) {
      const nuevaCount = parseInt(count - 1);
      setCount(nuevaCount);
    }
  };

  const CounterButtons = () => (
    // <Container style={globalStyles.container}>
    // <Content>
    //   <Form>
    <Container style={globalStyles.container}>
      <Item inlineLabel last style={globalStyles.input}>
        <Input
          keyboardType="numeric"
          placeholder="Monto"
          value={count.toString()}
          //   onChangeText={(val) => setAmount(val)}
        />
      </Item>
      <Grid
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginHorizontal: "3%",
          //   flex: 1,
        }}
      >
        <Col style={{ flex: 1 }}>
          <Button
            props
            dark
            style={{ height: 80, justifyContent: "center" }}
            onPress={() => console.log("test")}
          >
            <Icon style={{ fontSize: 40 }} name="remove" />
          </Button>
        </Col>
        <Col style={{ flex: 3 }}>
          <Input
            inlineLabel
            last
            style={[
              globalStyles.input,
              {
                textAlign: "center",
                fontSize: 70,
                backgroundColor: "white",
                height: 180,
                width: 20,
              },
            ]}
            value={count.toString()}
            keyboardType="numeric"
            // onChangeText={(count) => setCount(count)}
          />
        </Col>
        <Col style={{ flex: 1 }}>
          <Button
            props
            dark
            style={{ height: 80, justifyContent: "center" }}
            onPress={() => handleIncrease()}
          >
            <Icon style={{ fontSize: 40 }} name="add" />
          </Button>
        </Col>
      </Grid>
      {/* </Form> 
      </Content>*/}
    </Container>
  );
  return [count, CounterButtons, setCount];
};

useCounterButtons.defaultProps = {
  minCount: 0,
  maxCount: 100,
  initialState: 0,
};

export default useCounterButtons;
