import LoginNavigator from "./navigation/loginRoutes";
import { Provider, useSelector } from "react-redux";
// import react native paper
import Toast from "react-native-toast-message";
import { Provider as PaperProvider } from "react-native-paper";
// importing store
import Store from "./store/store";
import InitialNavigator from "./navigation/initialNavigator";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications-
  return (
    <PaperProvider>
      <Provider store={Store}>
        <InitialNavigator />
      </Provider>
      <Toast />
    </PaperProvider>
  );
}
