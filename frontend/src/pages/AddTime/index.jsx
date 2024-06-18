import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "easymde/dist/easymde.min.css";
import styles from "./AddTime.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const AddTime = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [time, setTime] = React.useState("");
  

  const isEditing = Boolean(id);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = { time };
      const { data } = isEditing
        ? await axios.patch(`/times/${id}`, fields)
        : await axios.post("/times", fields);
      const _id = isEditing ? id : data._id;
      navigate(`/`);
    } catch (err) {
      console.warn(err);
      alert("Fail create raspisaniya");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/times/${id}`).then(({ data }) => {
        setTime(data.time);
      });
    }
  }, []);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <TextField
        id="outlined-multiline-flexible"
        label="Time"
        multiline
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <div style={{ marginBottom: '10px' }} /> {/* Burada boşluk ekliyoruz */}
      
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Cоздавать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </div>
  );
};
