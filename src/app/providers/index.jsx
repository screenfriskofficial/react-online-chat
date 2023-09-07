import { createTheme, ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "../../context/AuthContext.jsx";
import { ChatContextProvider } from "../../context/ChatContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "./RouterProvider.jsx";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#a7bcff",
    },
  },
});

export const Router = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthContextProvider>
        <ChatContextProvider>
          <BrowserRouter>
            <RouterProvider />
          </BrowserRouter>
        </ChatContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};
