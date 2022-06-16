import React from "react";
// Handle console logs
import "utils/dropConsole";
// Styles
import "fontsource-roboto";
// ROUTER
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "navigation/RouterConfig";
// MUI Theme
import { ThemeProvider, createTheme } from "@mui/material/styles";
//import { ThemeSwitch } from "components/ThemeSwitch";
//import {dark, light } from "styles/muiTheme";
import "./App.css";
import { ProvideAuth } from "navigation/Auth/ProvideAuth";
// Redux
import { Provider } from "react-redux";
import {store} from "redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/poppins"; // Defaults to weight 400.
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  /*const [darkState, setDarkState] = useState(false);
    const handleThemeChange = () => {
    setDarkState(!darkState);
    console.log("theme=", darkState ? "dark" : "light");
  };*/
  const theme = createTheme({
    palette: {
      primary: {
        main: '#457AFB',
      },
    },
  });

  return (
    <>
      <div>
        <Provider store={store}>
          <ThemeProvider theme={/*darkState ? dark() :*/ /*light()*/theme}>
            {/*<ThemeSwitch
              darkState={darkState}
              handleThemeChange={handleThemeChange}
            />*/}
            <ProvideAuth>
              <BrowserRouter>
                <RouterConfig />
              </BrowserRouter>
            </ProvideAuth>
          </ThemeProvider>
        </Provider>
        <LocalizationProvider dateAdapter={DateAdapter}>...</LocalizationProvider>
      </div>
    </>
  );
}

export default App;
