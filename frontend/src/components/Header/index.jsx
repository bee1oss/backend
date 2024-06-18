import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth,selectUserRole,selectUserID } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [selectedValue, setSelectedValue] = useState("");
  const userRole = useSelector(selectUserRole); // Kullanıcı rolünü alıyoruz
  const userID = useSelector(selectUserID); // Kullanıcı kimliğini alıyoruz


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to logout")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>БГУ</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                {userRole && userRole.toLowerCase() === 'admin' && (
                  <Select
                    value={selectedValue}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="" disabled>
                      Добавить
                    </MenuItem>
                    <MenuItem value="add-rasp">
                      <Link to="/add-rasp">Расписания</Link>
                    </MenuItem>
                    <MenuItem value="add-time">
                      <Link to="/add-time">Время</Link>
                    </MenuItem>
                    <MenuItem value="add-predmet">
                      <Link to="/add-predmet">Предмет</Link>
                    </MenuItem>
                    <MenuItem value="add-group">
                      <Link to="/add-group">Группа</Link>
                    </MenuItem>
                    <MenuItem value="add-teacher">
                      <Link to="/add-teacher">Преподаватель</Link>
                    </MenuItem>
                    {/* Add more menu items here */}
                  </Select>
                )}
                <MenuItem value="/kabinet">
                  <Link to={`/kabinet/${userID}/edit`}>Личный Кабинет</Link>
                </MenuItem>
                
              
                <Button href="/login" onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outlined">Регистрация</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};