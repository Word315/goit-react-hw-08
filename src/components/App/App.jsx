import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";
import { Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "../ConfinedRoute";
import { PrivateRoute } from "../PrivateRoute";
import { Toaster } from "react-hot-toast";
import Layout from "../Layout/Layout";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                element={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" element={<LoginPage />} />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" element={<ContactsPage />} />
            }
          />
        </Routes>
      </Suspense>

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </Layout>
  );
}

export default App;