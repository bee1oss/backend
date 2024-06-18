import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"; 
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth, selectUserID } from "../../redux/slices/auth";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from 'axios';
import { selectUserRole } from "../../redux/slices/auth"; // selectUserRole ekledik
/*yapmak istedigimiz kullanicinin rolune gore sinif mi sececegine yada kendi ogretmen adinimi sececegine karar verecegiz ve buna gore secilen kisiye gore kullanicinin ders programini gosterecegiz*/

import styles from "./Kabinet.module.scss";

export const Kabinet = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const userRole = useSelector(selectUserRole);
  const userID = useSelector(selectUserID);
//buradan sonrasi
const [rasps, setRasps] = useState([]);
const [filters, setFilters] = useState({
  time: '',
  day: '',
  predmet: '',
  group: '',
  teacher: '',
  kurs: '',
  room: '',
});
const [uniqueTimes, setUniqueTimes] = useState([]);
const [uniqueDays, setUniqueDays] = useState([]);
const [uniquePredmets, setUniquePredmets] = useState([]);
const [uniqueGroups, setUniqueGroups] = useState([]);
const [uniqueTeachers, setUniqueTeachers] = useState([]);
const [uniqueKurs, setUniqueKurs] = useState([]);
const [uniqueRooms, setUniqueRooms] = useState([]);

//const [email,setemail] = React.useState("");
//const [fullname,setFullName] = React.useState("");


const fields = { email,fullName };

const updateUserData = async (userID, updatedFields) => {
  try {
    const response = await axios.patch(`/update/${userID}`, updatedFields);
    const updatedUser = response.data; // Güncellenmiş kullanıcı verisi
    console.log("Kullanıcı başarıyla güncellendi:", updatedUser);
    return updatedUser; // İsteğin başarılı olması durumunda güncellenmiş kullanıcı verisini döndürür
  } catch (error) {
    console.error("Kullanıcı güncellenirken bir hata oluştu:", error,email,fullName);
    throw error; // Hata durumunda hatayı yeniden fırlatır
  }
};

useEffect(() => {
  const fetchRasps = async () => {
    try {
      const response = await axios.get('http://localhost:5555/rasps');
      setRasps(response.data);

      const times = [...new Set(response.data.map((item) => item.time.time))];
      const days = [...new Set(response.data.map((item) => item.day.day))];
      const predmets = [...new Set(response.data.map((item) => item.predmet.predmet))];
      const groups = [...new Set(response.data.map((item) => item.group.group))];
      const teachers = [...new Set(response.data.map((item) => item.teacher.teacher))];
      const kurs = [...new Set(response.data.map((item) => item.group.kurs.kurs))];

      setUniqueTimes(times);
      setUniqueDays(days);
      setUniquePredmets(predmets);
      setUniqueGroups(groups);
      setUniqueTeachers(teachers);
      setUniqueKurs(kurs);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchRasps();
}, []);

const handleFilterChange = (field, value) => {
  setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
};



const filteredRasps = rasps.filter((item) => {
  return (
    (filters.time === '' || item.time.time === filters.time) &&
    (filters.day === '' || item.day.day === filters.day) &&
    (filters.predmet === '' || item.predmet.predmet === filters.predmet) &&
    (filters.group === '' || item.group.group === filters.group) &&
    (filters.teacher === '' || item.teacher.teacher === filters.teacher) &&
    (filters.kurs === '' || item.group.kurs.kurs === filters.kurs) &&
    (filters.room === '' || item.room === filters.room)
  );
});


  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  useEffect(() => {
    if (userData) {
      setEmail(userData.email);
      setFullName(userData.fullName);
    }
  }, [userData]);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      {userData && (
        <div>
          
          <Typography classes={{ root: styles.title }} variant="h6">
                ID: {userData._id}
          </Typography>
         
          <TextField
            id="outlined-multiline-flexible"
            label="email"
            multiline
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            sx={{ width: '30%', height: '50px' }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="fullname"
            multiline
            placeholder="fullname"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            sx={{ width: '30%', height: '50px' }}
          />          
          {
             userRole && userRole.toLowerCase() === "student" && 
             <>
              <Typography classes={{ root: styles.title }} variant="h6">
                Группа
              </Typography>
             <Select
                value={filters.group}
                onChange={(e) => handleFilterChange('group', e.target.value)}
                className={styles.field}
                sx={{ width: '20%', height: '55px' }}
              >{uniqueGroups.map((group) => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
              </Select>
              </>
          }
          {
            userRole && userRole.toLowerCase() === "teacher" && 
            <>
             <Typography classes={{ root: styles.title }} variant="h6">
               ФИО
             </Typography>
            <Select
                className={styles.field}
                sx={{ width: '30%', height: '55px' }}
                value={filters.teacher}
                onChange={(e) => handleFilterChange('teacher', e.target.value)}
             >{uniqueTeachers.map((teacher) => (
               <MenuItem key={teacher} value={teacher}>{teacher}</MenuItem>
              ))}
             </Select>
             </>
          }
          <Typography classes={{ root: styles.title }} variant="h6">
                User Role: {userData.userRole}
          </Typography>
          <Button type="submit" size="small" variant="contained" onClick={() => updateUserData(userID, fields)}>
          Обновить
          </Button>
        </div>
      )}
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="border-x border-gray-200 rounded-sm mt-3">
        {/* Filter dropdowns */}
        <div>
          <table>
          <thead>
                <td>
                  <select value={filters.time} onChange={(e) => handleFilterChange('time', e.target.value)}>
                    <option value="">All</option>
                    {uniqueTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                    </option>
                      ))}
                  </select>
                </td>
                <td>
                  <select value={filters.day} onChange={(e) => handleFilterChange('day', e.target.value)}>
                    <option value="">All</option>
                      {uniqueDays.map((day) => (
                      <option key={day} value={day}>
                      {day}
                      </option>
                      ))}
                  </select>
              </td>
              <td>
                <select
            value={filters.predmet}
            onChange={(e) => handleFilterChange('predmet', e.target.value)}
          >
            <option value="">All</option>
            {uniquePredmets.map((predmet) => (
              <option key={predmet} value={predmet}>
                {predmet}
              </option>
            ))}
          </select>
          </td>
        </thead>

          </table>
        </div>
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Время</th>
              <th>День</th>
              <th>Предмет</th>
              <th>Группа</th>
              <th>Преподаватель</th>
              <th>Курс</th>
              <th>Кабинет</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredRasps.map((item) => (
              <tr key={item._id}>
                <td>{item.time.time}</td>
                <td>{item.day.day}</td>
                <td>{item.predmet.predmet}</td>
                <td>{item.group.group}</td>
                <td>{item.teacher.teacher}</td>
                <td>{item.group.kurs.kurs}</td>
                <td>{item.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  );
};
