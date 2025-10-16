import { createContext, useContext, useState } from "react";

const AppointmentsContext = createContext();

export function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const removeAppointment = (id) => {
    setAppointments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, removeAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentsContext);
}
