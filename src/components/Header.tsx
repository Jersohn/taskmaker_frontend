import { CheckCircle2, ListTodo, Settings } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-600 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white">TASKMASTER</h1>
              <p className="text-indigo-100 text-sm">Gestionnaire de Tâches</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-white/90 hover:text-white transition-colors flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              Mes Tâches
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </a>
          </nav>

          {/* Bouton mobile */}
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/20">
            <ListTodo className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
