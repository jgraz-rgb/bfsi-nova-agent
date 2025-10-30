import logoImage from "@/assets/searchunify-logo.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="SearchUnify" className="h-6 w-auto" />
        </div>
      </div>
    </header>
  );
};
