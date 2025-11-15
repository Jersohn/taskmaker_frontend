import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TaskItem, TaskStatus } from "./components/TaskItem";
import { TaskDetailsDialog } from "./components/TaskDetailsDialog";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Plus, AlertCircle, Loader } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

interface Task {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
  status?: 'todo' | 'in-progress' | 'completed';
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_BASE}/api/tasks`);
      setTasks(res.data);
    } catch (err: any) {
      setError("Erreur: Vérifiez que le serveur Laravel fonctionne sur http://127.0.0.1:8000");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!inputValue.trim()) return;
    try {
      const res = await axios.post(`${API_BASE}/api/tasks`, {
        title: inputValue.trim(),
        description: "",
        completed: false,
        status: 'todo',
      });
      setTasks([res.data, ...tasks]);
      setInputValue("");
    } catch (err) {
      setError("Erreur lors de la création de la tâche");
    }
  };

  const updateTask = async (id: number, data: Partial<Task>) => {
    try {
      await axios.patch(`${API_BASE}/api/tasks/${id}`, data);
      setTasks(tasks.map(t => t.id === id ? { ...t, ...data } : t));
    } catch (err) {
      setError("Erreur lors de la mise à jour");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/api/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression");
    }
  };

  const handleTaskStatusChange = (id: string, status: TaskStatus) => {
    const numId = Number(id);
    const isCompleted = status === "completed";
    console.log("Changement statut:", { id: numId, status, isCompleted });
    updateTask(numId, { status, completed: isCompleted });
  };

  const handleViewDetails = (id: string) => {
    const task = tasks.find(t => t.id === Number(id));
    if (task) {
      setSelectedTask(task);
      setIsDialogOpen(true);
    }
  };

  const handleSaveDetails = async (updatedTask: Task) => {
    await updateTask(updatedTask.id, {
      title: updatedTask.title,
      description: updatedTask.description,
      completed: updatedTask.completed,
      status: (updatedTask as any).status ?? (updatedTask.completed ? 'completed' : 'todo'),
    });
    setIsDialogOpen(false);
  };

  const resolvedStatus = (t: Task) => t.status ?? (t.completed ? 'completed' : 'todo');
  const todoTasks = tasks.filter(t => resolvedStatus(t) === 'todo');
  const inProgressTasks = tasks.filter(t => resolvedStatus(t) === 'in-progress');
  const completedTasks = tasks.filter(t => resolvedStatus(t) === 'completed');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-3" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800">Erreur</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                  <button
                    onClick={loadTasks}
                    className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg border border-indigo-100 p-6 mb-8">
            <h2 className="text-gray-800 mb-4">Ajouter une nouvelle tâche</h2>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Nouvelle tâche..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                className="flex-1 border-indigo-200"
              />
              <Button onClick={addTask} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-5 w-5" />
                Ajouter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-4">
              <div className="text-gray-600 text-sm mb-1">À faire</div>
              <div className="text-gray-800 text-2xl font-bold">{todoTasks.length}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-4">
              <div className="text-blue-700 text-sm mb-1">En cours</div>
              <div className="text-blue-800 text-2xl font-bold">{inProgressTasks.length}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-4">
              <div className="text-green-700 text-sm mb-1">Terminées</div>
              <div className="text-green-800 text-2xl font-bold">{completedTasks.length}</div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">Toutes ({tasks.length})</TabsTrigger>
              <TabsTrigger value="todo">À faire ({todoTasks.length})</TabsTrigger>
              <TabsTrigger value="in-progress">En cours ({inProgressTasks.length})</TabsTrigger>
              <TabsTrigger value="completed">Terminées ({completedTasks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {tasks.length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-white rounded-lg border border-gray-200">
                  Aucune tâche
                </div>
              ) : (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={String(task.id)}
                    text={task.title}
                    status={task.status ?? (task.completed ? "completed" : "todo")}
                    priority="medium"
                    description={task.description || ""}
                    onUpdate={(id, text) => {
                      if (text !== task.title) {
                        updateTask(Number(id), { title: text });
                      }
                    }}
                    onStatusChange={handleTaskStatusChange}
                    onDelete={(id) => deleteTask(Number(id))}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="todo" className="space-y-3">
              {todoTasks.length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-white rounded-lg border">
                  Aucune tâche à faire
                </div>
              ) : (
                todoTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={String(task.id)}
                    text={task.title}
                    status={task.status ?? 'todo'}
                    priority="medium"
                    description={task.description || ""}
                    onUpdate={(id, text) => {
                      if (text !== task.title) {
                        updateTask(Number(id), { title: text });
                      }
                    }}
                    onStatusChange={handleTaskStatusChange}
                    onDelete={(id) => deleteTask(Number(id))}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="in-progress" className="space-y-3">
              {inProgressTasks.length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-white rounded-lg border">
                  Aucune tâche en cours
                </div>
              ) : (
                inProgressTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={String(task.id)}
                    text={task.title}
                    status={task.status ?? 'in-progress'}
                    priority="medium"
                    description={task.description || ""}
                    onUpdate={(id, text) => {
                      if (text !== task.title) {
                        updateTask(Number(id), { title: text });
                      }
                    }}
                    onStatusChange={handleTaskStatusChange}
                    onDelete={(id) => deleteTask(Number(id))}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3">
              {completedTasks.length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-white rounded-lg border">
                  Aucune tâche terminée
                </div>
              ) : (
                completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={String(task.id)}
                    text={task.title}
                    status="completed"
                    priority="medium"
                    description={task.description || ""}
                    onUpdate={(id, text) => {
                      if (text !== task.title) {
                        updateTask(Number(id), { title: text });
                      }
                    }}
                    onStatusChange={handleTaskStatusChange}
                    onDelete={(id) => deleteTask(Number(id))}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      <TaskDetailsDialog
        task={selectedTask}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveDetails}
      />
    </div>
  );
}
