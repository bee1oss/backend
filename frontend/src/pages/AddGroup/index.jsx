import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import "easymde/dist/easymde.min.css";
import styles from "./AddGroup.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const AddGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [group, setGroup] = React.useState("");
  const [kurs, setKurs] = React.useState("");
  

  const isEditing = Boolean(id);

  const [kurses, setKurses] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/kurses")
    .then(kurses=>setKurses(kurses.data))
    .catch(err=>console.log(err))
  },[])

  const fields = { group, kurs };
  const onSubmit = async () => {
    try {
      setLoading(true);
      
      const { data } = isEditing
        ? await axios.patch(`/groups/${id}`, fields)
        : await axios.post("/groups", fields);
      const _id = isEditing ? id : data._id;
      navigate(`/`);
    } catch (err) {
      console.warn(err);
      alert("Fail create raspisaniya");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/groups/${id}`).then(({ data }) => {
        setGroup(data.group);
        setKurs(data.kurs);
      });
    }
  }, []);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }


  

  return (
    <div className={styles.container}>
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <strong className="text-gray-700 font-medium"></strong>
        <div className="border-x border-gray-200 rounded-sm mt-2">
          <table className="w-full text-gray-700">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Курс</th>
                </tr>
              </thead>
              <tbody>
                <td>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Group"
                  multiline
                  placeholder="Group"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                />
                </td>
                <td>
                <Select value={kurs} onChange={(e) => setKurs(e.target.value)} fullWidth>
                  {kurses.map(item => (
                    <MenuItem key={item._id} value={item._id}>{item.kurs}</MenuItem>
                  ))}
                </Select>
              </td>
              </tbody>
          </table>
        </div>
      </div>
      <div style={{ marginBottom: '10px' }} /> {/* Burada boşluk ekliyoruz */}
        <div className={styles.buttons}>
          <Button onClick={onSubmit} size="large" variant="contained">
             {isEditing ? "Сохранить" : "Опубликовать"}
               </Button>
                  <a href="/">
                    <Button size="large">Отмена</Button>
                  </a>
        </div>
    </div>
  );
};
