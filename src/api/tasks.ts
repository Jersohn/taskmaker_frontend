import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export type Task = {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
};

export async function fetchTasks(): Promise<Task[]> {
  const res = await axios.get(`${API_BASE}/api/tasks`);
  return res.data;
}

export async function createTask(payload: Partial<Task>) {
  const res = await axios.post(`${API_BASE}/api/tasks`, payload);
  return res.data;
}

export async function updateTask(id: number, payload: Partial<Task>) {
  const res = await axios.patch(`${API_BASE}/api/tasks/${id}`, payload);
  return res.data;
}

export async function toggleTask(id: number, completed: boolean) {
  const res = await axios.patch(`${API_BASE}/api/tasks/${id}`, { completed });
  return res.data;
}

export async function deleteTask(id: number) {
  await axios.delete(`${API_BASE}/api/tasks/${id}`);
}

export default { fetchTasks, createTask, updateTask, toggleTask, deleteTask };
