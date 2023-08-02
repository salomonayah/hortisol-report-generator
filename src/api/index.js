import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, USERNAME } from '../utils/const';
import formatDate from '../utils/formatDate';
import GetValueFromLocalStorage from '../utils/getValueFromLocalStorage';
import PreserveValueToLocalStorage from '../utils/preserveValueToLocalStorage';
import axiosInstance from './axiosInstance';

export function setHeaders() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  axiosInstance.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

export async function downloadReport({ format }) {
  try {
    //get last request value
    const { filterType, startDate, endDate, state } =
      GetValueFromLocalStorage();

    setHeaders();

    const url = `${axiosInstance.getUri()}/Reports/Download?state=${
      state.id
    }&filter.filterType=${filterType}&filter.startDate=${formatDate(
      startDate,
      "YYYY-MM-DD"
    )}&filter.endDate=${formatDate(endDate, "YYYY-MM-DD")}&format=${format}`;

    const responseBlob = await axiosInstance.get(url, {
      responseType: "blob",
    });

    const blobFile = responseBlob.data;

    const filename = responseBlob.headers.filename;

    // create "a" HTML element with href to file & click
    const link = document.createElement("a");

    const href = URL.createObjectURL(blobFile);

    link.href = href;

    link.setAttribute("download", filename);

    document.body.appendChild(link);

    link.click();

    // clean up "a" element
    document.body.removeChild(link);

    //remove ObjectURL
    URL.revokeObjectURL(href);
  } catch (error) {
    throw error;
  }
}

export async function getReportList({
  filterType,
  startDate,
  endDate,
  state,
  sortType,
  sortField,
}) {
  PreserveValueToLocalStorage({
    filterType,
    startDate,
    endDate,
    state,
    sortType,
    sortField,
  });

  setHeaders();

  try {
    const response = await axiosInstance.get(
      `/Reports?state=${
        state.id
      }&filter.filterType=${filterType}&filter.startDate=${formatDate(
        startDate,
        "YYYY-MM-DD"
      )}&filter.endDate=${formatDate(
        endDate,
        "YYYY-MM-DD"
      )}&sort.sortType=${sortType}&sort.field=${sortField}`
    );
    return response.data.data.details;
  } catch (error) {
    throw error;
  }
}

export async function getStateList() {
  setHeaders();

  try {
    const response = await axiosInstance.get("/Enums/StateTypes");
    //return response.data
    return response.data.data.details;
  } catch (error) {
    throw error;
  }
}

export async function getStateListWithFilter(id) {
  setHeaders();

  try {
    const response = await axiosInstance.get(`/Enums/States?id=${id || 1}`);
    //return response.data.filters
    return response.data.data.details.filters;
  } catch (error) {
    throw error;
  }
}

export async function Login(data) {
  try {
    const response = await axiosInstance.post(`/login`, data);
    localStorage.setItem(
      AUTH_TOKEN_KEY,
      response.data.data.details.accessToken
    );
    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      response.data.data.details.refreshToken
    );

    localStorage.setItem(USERNAME, response.data.data.details.displayName);
    setHeaders();
    return response.data.data.details;
  } catch (error) {
    throw error;
  }
}

export async function WhoAmI() {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!token || token === "undefined") return;
  try {
    const response = await axiosInstance.get(`/protected`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function refreshToken() {
  try {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!token || token === "undefined") return;
    const response = await axiosInstance.get(`/refresh`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem(
      AUTH_TOKEN_KEY,
      response.data.data.details.accessToken
    );
    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      response.data.data.details.refreshToken
    );
    setHeaders();
    return response.data;
  } catch (error) {
    localStorage.clear();
    throw error;
  }
}
