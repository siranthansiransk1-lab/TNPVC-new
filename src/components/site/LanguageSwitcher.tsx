import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "bn", name: "Bengali" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" }
];

export const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Read the googtrans cookie to find active language
    const match = document.cookie.match(/(?:^|; )googtrans=([^;]*)/);
    if (match) {
      const val = match[1];
      const langCode = val.split('/')[2];
      if (langCode) {
        setCurrentLang(langCode);
      }
    }
  }, []);

  const changeLanguage = (code: string) => {
    if (code === "en") {
      document.cookie = `googtrans=/en/en; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/en; path=/;`;
    } else {
      document.cookie = `googtrans=/en/${code}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/${code}; path=/;`;
    }
    window.location.reload();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-border/50 bg-white/50 backdrop-blur-sm px-3 py-2 text-xs font-semibold text-foreground transition-all hover:bg-white hover:text-primary hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <Globe className="size-4" />
          <span className="inline-block">
            {languages.find(l => l.code === currentLang)?.name || "Language"}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 rounded-2xl p-2 shadow-xl border-border/50 bg-white/95 backdrop-blur-xl">
        <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer outline-none",
                currentLang === lang.code
                  ? "bg-primary/10 text-primary font-bold focus:bg-primary/20 focus:text-primary"
                  : "text-foreground focus:bg-muted/80 focus:text-primary"
              )}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
