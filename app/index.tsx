import HomeScreen from "@/app/pages/home";
import { apiSlice } from "@/services/services";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

export default function AppHome() {
  return (
    <ApiProvider api={apiSlice}>
      <HomeScreen />
    </ApiProvider>
  );
}
