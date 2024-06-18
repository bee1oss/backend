import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const RaspFilter = () => {
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
        const rooms = [...new Set(response.data.map((item) => item.room))];

        setUniqueTimes(times);
        setUniqueDays(days);
        setUniquePredmets(predmets);
        setUniqueGroups(groups);
        setUniqueTeachers(teachers);
        setUniqueKurs(kurs);
        setUniqueRooms(rooms);
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

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="border-x border-gray-200 rounded-sm mt-3">
        {/* Filter dropdowns */}
        <div>
          <table>
            <thead>
              <td>
                <label>Время:</label>
              </td>
              <td>
                <label>День:</label>
              </td>
              <td>
                <label>Предмет:</label>
              </td>
              <td>
                <label>Группа:</label>
              </td>
              <td>
                <label>Преподаватель:</label>
              </td>
              <td>
                <label>Курс:</label>
              </td>
              <td>
                <label>Кабинет:</label>
              </td>
            </thead>
            <tbody>
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
          <td>
          <select
            value={filters.group}
            onChange={(e) => handleFilterChange('group', e.target.value)}
          >
            <option value="">All</option>
            {uniqueGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          </td>
          <td>
          <select
            value={filters.teacher}
            onChange={(e) => handleFilterChange('teacher', e.target.value)}
          >
            <option value="">All</option>
            {uniqueTeachers.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
          </td>
          <td>
          <select
            value={filters.kurs}
            onChange={(e) => handleFilterChange('kurs', e.target.value)}
          >
            <option value="">All</option>
            {uniqueKurs.map((kurs) => (
              <option key={kurs} value={kurs}>
                {kurs}
              </option>
            ))}
          </select>
          </td>
          <td>
          <select
            value={filters.room}
            onChange={(e) => handleFilterChange('room', e.target.value)}
          >
            <option value="">All</option>
            {uniqueRooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          </td>
            </tbody>
          </table>
          
          
        </div>
        <div>
          
          
        </div>
        <div>
          
          
        </div>
        <div>
          

        </div>
        <div>
          

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
                {/*<td>
                  <button size="ml-auto" class="bg-green-500 text-white px-4 py-2 rounded-md justify-end" >
                      Update
                  </button>
                </td>
                <td>
                <button size="ml-auto" class="bg-red-500 text-white px-4 py-2 rounded-md justify-end">
                      Delete
                  </button>
            </td>*/}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
