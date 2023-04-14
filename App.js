import LoginNavigator from "./navigation/loginRoutes";
import { Provider } from "react-redux";
// import react native paper
import { Provider as PaperProvider } from "react-native-paper";
// importing store
import Store from "./store/store";

export default function App() {
  return (
    <PaperProvider>
      <Provider store={Store}>
        {/* // todo - use loginNavigator if isLoggedin == true */}
        <LoginNavigator />
      </Provider>
    </PaperProvider>
  );
}
