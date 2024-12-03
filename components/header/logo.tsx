import { Eye } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Eye className="h-8 w-8" />
    </Link>
  );
}