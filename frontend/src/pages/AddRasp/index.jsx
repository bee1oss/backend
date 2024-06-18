////not ekleme islemi yaparken bazi veriler alinmiyor o yuzden ekleme islemi basarisiz oluyor
import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';



import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const AddRasp = () => {


  const [rows, setRows] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [time, setTime] = React.useState("");
  const [day, setDay] = React.useState("");
  const [group, setGroup] = React.useState("");
  const [kurs, setKurs] = React.useState("");
  const [predmet, setPredmet] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [teacher, setTeacher] = React.useState("");

  const [formData, setFormData] = useState([{ time: '', day: '', predmet: '', group: '', teacher: '', room: '' }]);
  const isEditing = Boolean(id);


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Token ekleniyor:', token); // Token'ı konsola yazdırarak kontrol ediyoruz
    }
  }, []);

  
  const [teachers, setTeachers] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/teachers")
    .then(teachers=>setTeachers(teachers.data))
    .catch(err=>console.log(err))
  },[])

  const [groups, setGroups] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/groups")
    .then(groups=>setGroups(groups.data))
    .catch(err=>console.log(err))
  },[])

  const [times, setTimes] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/times")
    .then(times=>setTimes(times.data))
    .catch(err=>console.log(err))
  },[])

  const [days, setDays] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/days")
    .then(days=>setDays(days.data))
    .catch(err=>console.log(err))
  },[])

  const [predmets, setPredmets] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:5555/predmets")
    .then(predmets=>setPredmets(predmets.data))
    .catch(err=>console.log(err))
  },[])

  //const fields = { time, day, group, kurs, predmet, room, teacher };
  const onSubmit = async () => {
    try {
      setLoading(true);
      
      console.log("Form verileri:", formData);

      const postData = formData.map(data => ({
        time: data.time,
        day: data.day,
        predmet: data.predmet,
        group: data.group,
        teacher: data.teacher,
        room: data.room,
        
      }));
  
      const { data } = isEditing
        ? await axios.patch(`/rasps/${id}`, postData)
        : await axios.post("/rasps", postData);
  
      const _id = isEditing ? id : data._id;
      navigate(`/`);
    } catch (err) {
      console.error("Error:", err.response); // Hata konsolda görüntülenir
      //alert("Fail create raspisaniya");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/rasps/${id}`).then(({ data }) => {
        setTime(data.time.time);
        setDay(data.day.day);
        setGroup(data.group.group);
        setKurs(data.group.kurs.kurs);
        setPredmet(data.predmet.predmet);
        setRoom(data.room);
        setTeacher(data.teacher.teacher);
      });
    }
  }, []);
//deneme button add
  const handleIncrease = () =>{
    setRows(rows + 1);
    setFormData([...formData, { time: '', day: '', predmet: '', group: '', teacher: '', room: ''}]);
  }
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newFormData = [...formData];
    newFormData[index] = {
      ...newFormData[index],
      [name]: value
    };
    setFormData(newFormData);
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
    <strong className="text-gray-700 font-medium"></strong>
    <div className="border-x border-gray-200 rounded-sm mt-2">
    {formData.map((data, index) => (
      <table className="w-full text-gray-700" key={index}>
      <thead>
        <tr>
          <th>Группа</th>
          <th>День</th>
        </tr>
        <td>
        <Select value={data.group} onChange={(e) => handleInputChange(index, e)} name="group" fullWidth>
          {groups.map(item => (
            <MenuItem key={item._id} value={item._id}>
              <Typography>{item.group} {item.kurs.kurs} Курс</Typography>
            </MenuItem>
          ))}
        </Select>
        </td>
        <td>
        <Select value={data.day} onChange={(e) => handleInputChange(index, e)} name="day" fullWidth>
          {days.map(item => (
            <MenuItem key={item._id} value={ item._id }>
              <Typography>{item.day}</Typography>
            </MenuItem>
          ))}
        </Select>
        </td>
            <tr>
              <th>Время</th>
              <th>Предмет</th>
              <th>Преподаватель</th>
              <th>Кабинет</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>
                <Select value={data.time} onChange={(e) => handleInputChange(index, e)} name="time" fullWidth>
                  {times.map(item => (
                    <MenuItem key={item._id} value={item._id}>{item.time}</MenuItem>
                  ))}
                </Select>
              </td>
              <td>
                <Select value={data.predmet} onChange={(e) => handleInputChange(index, e)} name="predmet" fullWidth>
                  {predmets.map(item => (
                    <MenuItem key={item._id} value={item._id}>{item.predmet}</MenuItem>
                  ))}
                </Select>
              </td>
              <td>
                <Select value={data.teacher} onChange={(e) => handleInputChange(index, e)} name="teacher" fullWidth>
                  {teachers.map(item => (
                    <MenuItem key={item._id} value={item._id}>{item.teacher}</MenuItem>
                  ))}
                </Select>
              </td>
              <td>
                <TextField
                  classes={{ root: styles.tags }}
                  variant="standard"
                  placeholder="room"
                  value={data.room}
                  onChange={(e) => handleInputChange(index, e)}
                  name="room"
                  fullWidth
                />
              </td>
            </tr>
          </tbody>
      </table>
      ))}
    </div>
    </div>
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Cоздавать"}
        </Button>
        <button className="ml-auto bg-blue-500 text-white p-2 rounded" onClick={handleIncrease}>+1</button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
      </>
  );
};
