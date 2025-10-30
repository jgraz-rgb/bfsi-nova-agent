import { Search } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
            <Search className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">SearchUnify</span>
        </div>
      </div>
    </header>
  );
};
