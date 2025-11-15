import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TaskStatus } from "./TaskItem";
import { Calendar, Save } from "lucide-react";


interface TaskDetailsDialogProps {
  task: any;
  open: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
}

const statusConfig = {
  todo: "À faire",
  "in-progress": "En cours",
  completed: "Terminé",
};

const priorityConfig = {
  low: { label: "Faible", color: "text-gray-600" },
  medium: { label: "Moyenne", color: "text-yellow-600" },
  high: { label: "Haute", color: "text-red-600" },
};

export function TaskDetailsDialog({ task, open, onClose, onSave }: TaskDetailsDialogProps) {
  const [editedTask, setEditedTask] = useState<any>(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!editedTask) return null;

  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask);
    }
    onClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Détails de la tâche</DialogTitle>
          <DialogDescription>
            Consultez et modifiez les informations de votre tâche
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Titre */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
                value={editedTask?.title || ""}
              onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
              }
              placeholder="Titre de la tâche"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
                value={editedTask?.description || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              placeholder="Ajoutez une description détaillée..."
              rows={4}
            />
          </div>

          {/* Statut et Priorité */}
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select
              value={editedTask?.status ?? (editedTask?.completed ? 'completed' : 'todo')}
              onValueChange={(value: any) =>
                setEditedTask({ ...editedTask, status: value, completed: value === 'completed' })
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">À faire</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Informations */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Créée le {editedTask?.created_at ? formatDate(editedTask.created_at) : "N/A"}</span>
            </div>
            <div className="text-sm text-gray-600">
              ID: <span className="font-mono text-xs">{editedTask?.id || "N/A"}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
