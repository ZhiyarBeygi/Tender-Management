import axiosClient from "./axiosClient";

export function getTenders() {
  return axiosClient.get("/Tenders");
}

export function searchTenders(term) {
  return axiosClient.get(
    `/Tenders/search?term=${encodeURIComponent(term)}`
  );
}