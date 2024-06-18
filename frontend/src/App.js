import Container from "@mui/material/Container";
import { Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import { Header } from "./components";
import { Home, Registration, Login, AddRasp, AddTime, AddPredmet } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth, selectUserRole } from "./redux/slices/auth"; // selectUserRole ekledik
import { AddGroup } from "./pages/AddGroup";
import { AddTeacher } from "./pages/AddTeacher";
import { Kabinet } from "./pages/Kabinet";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userRole = useSelector(selectUserRole); // Kullanıcı rolünü alıyoruz

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  // Sadece admin rolüne sahip kullanıcılar için erişim kontrolü
  const adminRoute = (component) => {
    if (!isAuth) {
      return <Navigate to="/login" />;
    }
    if (userRole !== "admin") {
      return <Navigate to="/" />;
    }
    return component;
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kabinet/:id/edit" element={<Kabinet />} />
          <Route path="/add-rasp" element={adminRoute(<AddRasp />)} /> {/* Sadece admin erişebilir */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/add-time" element={adminRoute(<AddTime />)} />
          <Route path="/times/:id/edit" element={adminRoute(<AddTime />)} />
          <Route path="/rasps/:id/edit" element={adminRoute(<AddRasp />)} />
          <Route path="/add-predmet" element={adminRoute(<AddPredmet />)} />
          <Route path="/predmets/:id/edit" element={adminRoute(<AddPredmet />)} />
          <Route path="/add-group" element={adminRoute(<AddGroup />)} />
          <Route path="/groups/:id/edit" element={adminRoute(<AddGroup />)} />
          <Route path="/add-teacher" element={adminRoute(<AddTeacher />)} />
          <Route path="/teachers/:id/edit" element={adminRoute(<AddTeacher />)} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
