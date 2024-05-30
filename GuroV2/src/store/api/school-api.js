import defaultAxios from "axios";
import { baseURL } from "../../constants/constants";

const axios = defaultAxios.create({
  // baseURL: window.location.protocol+`//` + window.location.hostname + `:9003` + `/api/public/module`,
  baseURL: baseURL + `/api/public/module`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
const libraryAxios = defaultAxios.create({
  baseURL: baseURL + `/api/public/util`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const getSubjects = async (body) => {
  return await axios.post("getSubjects", body);
};

export const getTopics = async (body) => {
  return await axios.post("getTopics", body);
};

export const getModules = async (body) => {
  return await axios.post("getModules", body);
};

export const getEasyModules = async (body) => {
  return await axios.post("getEasyModules", body);
};

export const getAverageModules = async (body) => {
  return await axios.post("getAverageModules", body);
};

export const getDifficultModules = async (body) => {
  return await axios.post("getDifficultModules", body);
};

export const getLibrary = async (body) => {
  return await libraryAxios.get("getLibrary", body);
};

export const getLibraryLessons = async (body) => {
  return await libraryAxios.get("getLibraryLessons", body);
};

export const getLibraryVideos = async (body) => {
  return await libraryAxios.get("getLibraryVideos", body);
};

export const getLibraryLessonsPerGrade = async (body) => {
  return await libraryAxios.post("getLibraryLessonsPerGrade", body);
};

export const getLibraryVideosPerGrade = async (body) => {
  return await libraryAxios.post("getLibraryVideosPerGrade", body);
};
