import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "toastify-js/src/toastify.css"

import { refreshToken, setHeaders, WhoAmI } from './api';
import axiosInstance from './api/axiosInstance';
import Home from './page/Home';
import Login from './page/Login';
import { AppWrapper } from './state';
import UnauthorizedInterceptor from './utils/unauthorizeInterceptor';
import convertDateFormat from './utils/convertDateFormat';

function App() {
  const [currentState, setCurrentState] = useState(null);
  const [filterType, setFilterType] = useState();
  const [reports, setReports] = useState({ data: false });
  const [filters, setFilters] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2022-01-01"));
  const [endDate, setEndDate] = useState(new Date("2023-01-01"));
  const [sortType, setSortType] = useState(1);
  const [sortField, setSortField] = useState("");
  const [user, setUser] = useState(null);
  const [appIsLoaded, setAppIsLoaded] = useState(false)

  function onSelectStartDate(date) {
    setStartDate(new Date(convertDateFormat(date)));
  }

  function onSelectEndDate(date) {
    setEndDate(new Date(convertDateFormat(date)));
  }

  useEffect(() => {
    const localState = {
      currentState,
      filterType,
      filters,
      startDate,
      endDate,
      sortType,
      sortField,
    };
    localStorage.setItem("localState", JSON.stringify(localState));
  }, [
    currentState,
    filterType,
    filters,
    startDate,
    endDate,
    sortType,
    sortField,
  ]);

  function init() {
    setHeaders();
    WhoAmI()
      .then((data) => {
        setUser(data);
        setAppIsLoaded(true)
      })
      .catch(() => {
        refreshToken()
          .then((data) => {
            setUser(data);
            setAppIsLoaded(true)
          })
          .catch(() => {
            setUser(null);
            setAppIsLoaded(true)
          });
      });
  }

  useEffect(() => {
    init();
    axiosInstance.interceptors.response.use(
      null,
      UnauthorizedInterceptor(() => {
        return new Promise((resolve, reject) => {
          refreshToken()
            .then((data) => {
              setUser(data);
              resolve(data);
              setAppIsLoaded(true)
            })
            .catch(() => {
              setUser(null);
              reject();
              setAppIsLoaded(true)
            });
        });
      })
    );
  }, []);

  return (
    <AppWrapper
      state={{
        reports,
        setReports,
        currentState,
        setCurrentState,
        filterType,
        setFilterType,
        startDate,
        setStartDate: onSelectStartDate,
        endDate,
        setEndDate: onSelectEndDate,
        filters,
        setFilters,
        sortType,
        setSortType,
        sortField,
        setSortField,
        user,
        setUser,
      }}
    >
      <div className="App">
        {
          appIsLoaded && (
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Home />} />
              </Routes>
            </Router>
          )
        }
      </div>
    </AppWrapper>
  );
}

export default App;
