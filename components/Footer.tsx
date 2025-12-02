export default function Footer() {
  return (
    <footer className="w-full bg-brand-dark border-t border-white/5 py-8 text-center mt-auto relative z-50">
      <div className="container mx-auto px-4">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Game Connection - Todos os direitos reservados.
        </p>
        {/* <p className="text-gray-600 text-xs mt-2">
          Desenvolvido para Fase 04 Happy Game
        </p> */}
      </div>
    </footer>
  );
}