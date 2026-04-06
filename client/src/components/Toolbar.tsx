import { Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Toolbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-primary/95 to-primary/90 backdrop-blur-sm shadow-md">
      <div className="container max-w-md mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary-foreground" />
          <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
            SafeHer
          </h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/10"
              data-testid="button-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem data-testid="menu-item-settings">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="menu-item-privacy">
              Privacy Policy
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="menu-item-help">
              Help & Support
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
