import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate } from "react-router-dom";
import { useStorage } from "../store/root";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FunctionComponent<AuthGuardProps> = observer(
  ({ children }) => {
    const storage = useStorage();

    const isAuthenticated = !!storage.gui.authUser;

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  }
);
