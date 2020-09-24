import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const PushNotification = ({ send = false }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (send) {
      schedulePushNotification();
    }
  }, [send]);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  console.log(expoPushToken);
  //   console.log(JSON.stringify(notification?.request.content.data));
  return <View />;
  //   (
  //     <View
  //       style={{
  //         flex: 1,
  //         alignItems: "center",
  //         justifyContent: "space-around",
  //       }}
  //     >
  //       <Text>Your expo push token: {expoPushToken}</Text>
  //       <View style={{ alignItems: "center", justifyContent: "center" }}>
  //         <Text>
  //           Title: {notification && notification.request.content.title}{" "}
  //         </Text>
  //         <Text>Body: {notification && notification.request.content.body}</Text>
  //         <Text>
  //           Data:{" "}
  //           {notification && JSON.stringify(notification.request.content.data)}
  //         </Text>
  //       </View>
  //       <Button
  //         title="Press to schedule a notification"
  //         onPress={async () => {
  //           await schedulePushNotification();
  //         }}
  //       />
  //     </View>
  //   );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      sound: "default",
      title: "Información Vencida!! 📬",
      body:
        "Por favor Renueve la fecha de vencimiento y cierre de tu tarjeta de crédito 💳",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default PushNotification;
