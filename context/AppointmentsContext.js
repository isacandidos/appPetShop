import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppointmentsContext = createContext();

export function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("appointments").then((data) => {
      if (data) setAppointments(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  function addAppointment(newAppointment) {
    setAppointments((prev) => [...prev, newAppointment]);
  }

  function removeAppointment(id) {
    setAppointments((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, removeAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentsContext);
}
