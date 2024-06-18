import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Rasp } from "../components/Rasp/index";
import { Time } from "../components/Time";
import { Predmet } from "../components/Predmet";
import { Group } from "../components/Group";


import { selectUserRole } from "../redux/slices/auth"; // selectUserRole ekledik
import { fetchRasps } from "../redux/slices/rasps";
import { fetchTimes } from "../redux/slices/times";
import {fetchPredmets} from "../redux/slices/predmets"
import { fetchGroups } from "../redux/slices/groups";
import { fetchTeachers } from "../redux/slices/teachers";
import { Teacher } from "../components/Techers";
import { RaspFilter } from "../components/RaspFilters/RaspFilter";


export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { rasps } = useSelector((state) => state.rasps);
  const { times } = useSelector((state) => state.times);
  const { predmets } = useSelector((state)  => state.predmets );
  const { groups } = useSelector((state) => state.groups);
  const { teachers } = useSelector((state) => state.teachers)


  const userRole = useSelector(selectUserRole); // Kullanıcı rolünü alıyoruz


  const [selectedTab, setSelectedTab] = useState(0); // Durum değişikliği

  useEffect(() => {
    dispatch(fetchRasps());
    dispatch(fetchTimes());
    dispatch(fetchPredmets());
    dispatch(fetchGroups());
    dispatch(fetchTeachers());
  }, []);
    
  // Rasps ve times yüklenene kadar bekleyen loading state
  const isRaspsLoading = rasps.status === "loading";
  const isTimesLoading = times.status === "loading";
  const isPredmetsLoading = predmets.status === "loading";
  const isGroupsLoading = groups.status === "loading";
  const isTeachersLoading = groups.status === "loading";

  useEffect(() => {
    if (selectedTab === 0) {
      dispatch(fetchRasps());
    } else if (selectedTab === 2) {
      dispatch(fetchTimes());
    } else if (selectedTab === 3) {
      dispatch(fetchPredmets());
    } else if (selectedTab === 4) {
      dispatch(fetchGroups());
    } else if (selectedTab === 5) {
      dispatch(fetchTeachers());
    }
  }, [dispatch, selectedTab]); // dispatch ve selectedTab'i bağımlılıklar listesine ekleyin

  

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={selectedTab}
        onChange={handleTabChange}
      >
        {userRole && userRole.toLowerCase() !== "admin" || userRole && userRole.toLowerCase() === "admin" && <Tab label="Расписания" />}
        {userRole && userRole.toLowerCase() === "admin" && <Tab label="Расписания для админ" />}
        {userRole && userRole.toLowerCase() === "admin" && <Tab label="Время" />}
        {userRole && userRole.toLowerCase() === "admin" && <Tab label="Предмет" />}
        {userRole && userRole.toLowerCase() === "admin" && <Tab label="Группа" />}
        {userRole && userRole.toLowerCase() === "admin" && <Tab label="Препод" />}      
        
    </Tabs>

<div className="columns mt-5">
  <div>
  {selectedTab === 0 && (
      <RaspFilter />
    )}
    {selectedTab === 1 && (
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Day</th>
            <th>Predmed</th>
            <th>Group</th>
            <th>Teacher</th>
            <th>Kurs</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {isRaspsLoading ? (
            [...Array(50)].map((_, index) => (
              <Rasp key={index} isLoading={true} />
            ))
          ) : (
            rasps.items.map((obj) => (
              <Rasp
                key={obj._id}
                id={obj._id}
                time={obj.time.time}
                day={obj.day.day}
                predmet={obj.predmet.predmet}
                group={obj.group.group}
                teacher={obj.teacher.teacher}
                kurs={obj.group.kurs.kurs}
                room={obj.room}
                isEditable={userData?._id === obj.user._id}
              />
            ))
          )}
        </tbody>
      </table>
    )}
    {selectedTab === 2 && (
      <table>
        <thead>
          <tr>
            <th>Время</th>
            {selectedTab === 2 && 
            (isTimesLoading ? (
              <p>Loading...</p>
            ) : (
              times.items.map((time) => (
                <Time
                  key={time._id}
                  id={time._id}
                  time={time.time}
                  isEditable={userData?._id === time.user._id}
                />
              ))
            ))}
          </tr>
        </thead>
      </table>
    )}
    {selectedTab === 3 && (
      <table>
        <thead>
          <tr>
            <th>Предмет</th>
            
            {selectedTab === 3 &&
            (isPredmetsLoading ? (
              [...Array(50)].map((_, index) => (
                <Rasp key={index} isLoading={true} />
              ))
            ) : (
              predmets.items.map((predmet) => (
                <Predmet
                  key={predmet._id}
                  id={predmet._id}
                  predmet={predmet.predmet}
                  isEditable={userData?._id === predmet.user._id}
                />
              ))
            ))}
          </tr>
        </thead>
      </table>
    )}    
    {selectedTab === 4 && (
      <table>
        <thead>
          <tr>
            <th>Группа</th>
            <th>Куср</th>
            
          </tr>
        </thead>
        <tbody>
          {isGroupsLoading ? (
            [...Array(50)].map((_, index) => (
              <Rasp key={index} isLoading={true} />
            ))
          ) : (
            groups.items.map((gr) => (
              <Group
                key={gr._id}
                id={gr._id}
                group={gr.group}
                kurs={gr.kurs.kurs}
                isEditable={userData?._id === gr.user._id}
              />
            ))
          )}
          
        </tbody>
      </table>
    )}
    {selectedTab === 5 && (
      <table>
        <thead>
          <tr>
            <th>ФИО</th>
          </tr>
        </thead>
        <tbody>
          {isTeachersLoading ? (
            [...Array(50)].map((_, index) => (
              <Rasp key={index} isLoading={true} />
            ))
          ) : (
            teachers.items.map((tea) => (
              <Teacher
                key={tea._id}
                id={tea._id}
                teacher={tea.teacher}
                isEditable={userData?._id === tea.user._id}
              />
            ))
          )}
          
        </tbody>
      </table>
    )}
  </div>
</div>

</>
  );
};
