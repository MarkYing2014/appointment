import { useStore } from '@/lib/store';
import { Appointment } from '@/types/app';

export function useAppointments() {
  const store = useStore();

  const createAppointment = async (data: Omit<Appointment, 'id'>) => {
    try {
      const newAppointment: Appointment = {
        ...data,
        id: Date.now().toString(), // Generate a unique ID
      };
      store.addAppointment(newAppointment);
      return newAppointment;
    } catch (err) {
      console.error('Failed to create appointment:', err);
      throw err;
    }
  };

  const updateAppointment = (id: string, data: Partial<Appointment>) => {
    try {
      store.updateAppointment(id, data);
    } catch (err) {
      console.error('Failed to update appointment:', err);
      throw err;
    }
  };

  const deleteAppointment = (id: string) => {
    try {
      store.deleteAppointment(id);
    } catch (err) {
      console.error('Failed to delete appointment:', err);
      throw err;
    }
  };

  const getAppointments = () => {
    return store.appointments;
  };

  return {
    loading: false,
    error: null,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointments,
  };
}