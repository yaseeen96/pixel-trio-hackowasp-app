import LoginNavigator from "./navigation/loginRoutes";
import { Provider, useSelector } from "react-redux";
// import react native paper
import Toast from "react-native-toast-message";
import { Provider as PaperProvider } from "react-native-paper";
// importing store
import Store from "./store/store";
import InitialNavigator from "./navigation/initialNavigator";

export default function App() {
  return (
    <PaperProvider>
      <Provider store={Store}>
        <InitialNavigator />
      </Provider>
      <Toast />
    </PaperProvider>
  );
}
