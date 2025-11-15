import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Trash2, Edit2, Check, X, Eye, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type TaskStatus = "todo" | "in-progress" | "completed";

interface TaskItemProps {
  id: string;
  text: string;
  status: TaskStatus;
  priority?: "low" | "medium" | "high";
  description?: string;
  onUpdate: (id: string, text: string) => void;
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const statusConfig = {
  todo: {
    label: "À faire",
    color: "bg-gray-100 text-gray-700 border-gray-300",
  },
  "in-progress": {
    label: "En cours",
    color: "bg-blue-100 text-blue-700 border-blue-300",
  },
  completed: {
    label: "Terminé",
    color: "bg-green-100 text-green-700 border-green-300",
  },
};

const priorityConfig = {
  low: { label: "Faible", icon: "🟢" },
  medium: { label: "Moyenne", icon: "🟡" },
  high: { label: "Haute", icon: "🔴" },
};

export function TaskItem({ id, text, status, priority, description, onUpdate, onDelete, onViewDetails }: TaskItemProps) {
    console.log("TaskItem rendered:", { id, text, status });
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(id, editText.trim(), status);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    console.log("Status change:", { id, from: status, to: newStatus });
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-indigo-100 hover:shadow-lg hover:border-indigo-200 transition-all">
      {/* Statut */}
      <div className="w-32">
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className={`h-8 ${statusConfig[status].color} shadow-sm`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">À faire</SelectItem>
            <SelectItem value="in-progress">En cours</SelectItem>
            <SelectItem value="completed">Terminé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Texte de la tâche */}
      <div className="flex-1">
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="h-8"
            autoFocus
          />
        ) : (
          <div>
            <div className="flex items-center gap-2">
              <p
                className={`${
                  status === "completed" ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {text}
              </p>
              {priority && (
                <span className="text-sm" title={priorityConfig[priority].label}>
                  {priorityConfig[priority].icon}
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                {description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewDetails(id)}
              className="h-8 w-8 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              title="Voir les détails"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              title="Édition rapide"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(id)}
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
