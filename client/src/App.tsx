import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./route/app.routes";
import { AuthGuard } from "./route/Authguard";
import { StoreProvider, parentStore } from "./store/root";

function App() {
  return (
    <StoreProvider value={parentStore}>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.protected ? (
                  <AuthGuard>
                    <route.component {...route} />
                  </AuthGuard>
                ) : (
                  <route.component {...route} />
                )
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
