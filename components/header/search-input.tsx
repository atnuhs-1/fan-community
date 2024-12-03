import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function SearchInput() {
  return (
    <div className="relative w-full hidden md:block max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        type="text"
        placeholder="キーワードやユーザー名で検索"
        className="w-full pl-9 h-10 bg-muted/50"
      />
    </div>
  );
}