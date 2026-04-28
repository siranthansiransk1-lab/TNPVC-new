import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle2, ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppJoinModal = ({ isOpen, onClose }: WhatsAppJoinModalProps) => {
  const [selectedGroups, setSelectedGroups] = useState<{ allIndia: boolean; local: boolean }>({
    allIndia: true,
    local: true,
  });

  const links = {
    allIndia: "https://chat.whatsapp.com/FFEYgTl0MzQHCJTIpDXPuZ",
    local: "https://chat.whatsapp.com/IQGxuB3NY5AETizCRwZRJb?mode=gi_t",
  };

  const handleJoin = () => {
    if (selectedGroups.allIndia) {
      window.open(links.allIndia, "_blank");
    }
    
    if (selectedGroups.local) {
      if (selectedGroups.allIndia) {
        setTimeout(() => window.open(links.local, "_blank"), 500);
      } else {
        window.open(links.local, "_blank");
      }
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border border-border shadow-2xl rounded-2xl bg-white">
        <div className="p-8 pb-4 text-center">
          <div className="size-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-4 mx-auto">
            <MessageCircle className="size-6" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
              Join Our Community
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-muted-foreground mt-1 leading-relaxed">
              Select the groups you'd like to join
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 pt-2 space-y-3">
          <div className="space-y-3">
            {/* Option 1 */}
            <div 
              className={cn(
                "group flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer",
                selectedGroups.allIndia ? "border-green-600 bg-green-50/30" : "border-border hover:border-muted-foreground/30"
              )}
              onClick={() => setSelectedGroups(prev => ({ ...prev, allIndia: !prev.allIndia }))}
            >
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-foreground">All India Community</p>
                <p className="text-xs text-muted-foreground">National trade network</p>
              </div>
              <Checkbox 
                checked={selectedGroups.allIndia} 
                onCheckedChange={() => setSelectedGroups(prev => ({ ...prev, allIndia: !prev.allIndia }))}
                className="size-5 rounded border-muted-foreground/30 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
            </div>

            {/* Option 2 */}
            <div 
              className={cn(
                "group flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer",
                selectedGroups.local ? "border-green-600 bg-green-50/30" : "border-border hover:border-muted-foreground/30"
              )}
              onClick={() => setSelectedGroups(prev => ({ ...prev, local: !prev.local }))}
            >
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-foreground">Local TNPVC Community</p>
                <p className="text-xs text-muted-foreground">Regional support & leads</p>
              </div>
              <Checkbox 
                checked={selectedGroups.local} 
                onCheckedChange={() => setSelectedGroups(prev => ({ ...prev, local: !prev.local }))}
                className="size-5 rounded border-muted-foreground/30 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
            </div>
          </div>

          <Button 
            onClick={handleJoin}
            disabled={!selectedGroups.allIndia && !selectedGroups.local}
            className="w-full h-12 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            Join on WhatsApp
            <ChevronRight className="size-4" />
          </Button>
          
          <button 
            onClick={onClose}
            className="w-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors pt-2"
          >
            Not now
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
