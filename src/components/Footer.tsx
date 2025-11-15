export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} TASKMASTER. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              Confidentialité
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
