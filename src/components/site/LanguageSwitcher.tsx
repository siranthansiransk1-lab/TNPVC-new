import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

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

export const LanguageSwitcher = ({ 
  isTransparent, 
  className 
}: { 
  isTransparent?: boolean; 
  className?: string; 
}) => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Read the googtrans cookie to find active language
    const match = document.cookie.match(/(?:^|; )googtrans=([^;]*)/);
    let langCode = "en";
    
    if (match) {
      const val = match[1];
      langCode = val.split('/')[2] || "en";
      setCurrentLang(langCode);
    }

    // Load Google Translate script dynamically if not English or when needed
    if (langCode !== "en" && !window.google?.translate) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open && !window.google?.translate) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  };

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
    <DropdownMenu modal={false} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button 
          className={cn(
            "flex items-center gap-1.5 rounded-full min-h-0 h-9 px-3 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            isTransparent
              ? "border border-white/25 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/40 shadow-xs"
              : "border border-border/50 bg-white/60 backdrop-blur-sm text-foreground hover:bg-white hover:text-primary hover:border-primary/30",
            className
          )}
        >
          <Globe className={cn("size-3.5", isTransparent ? "text-white" : "text-muted-foreground")} />
          <span className="inline-block">
            {languages.find(l => l.code === currentLang)?.name || "Language"}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 p-0 rounded-2xl shadow-xl border-border/50 bg-white/95 backdrop-blur-xl overflow-hidden"
      >
        <div className="max-h-[320px] overflow-y-auto p-2 touch-pan-y">
          <div className="flex flex-col gap-1">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-colors cursor-pointer outline-none",
                  currentLang === lang.code
                    ? "bg-primary/10 text-primary font-bold focus:bg-primary/20 focus:text-primary"
                    : "text-foreground focus:bg-muted/80 focus:text-primary"
                )}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
