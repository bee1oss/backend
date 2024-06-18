import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "easymde/dist/easymde.min.css";
import styles from "./AddTeacher.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const AddTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [teacher, setTeacher] = React.useState("");
  

  const isEditing = Boolean(id);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = { teacher };
      const { data } = isEditing
        ? await axios.patch(`/teachers/${id}`, fields)
        : await axios.post("/teachers", fields);
      const _id = isEditing ? id : data._id;
      navigate(`/`);
    } catch (err) {
      console.warn(err);
      alert("Fail create raspisaniya");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/teachers/${id}`).then(({ data }) => {
        setTeacher(data.teacher);
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
        label="Teacher"
        multiline
        placeholder="Teacher"
        value={teacher}
        onChange={(e) => setTeacher(e.target.value)}
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
