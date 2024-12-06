import Link from "next/link";
import { Home, Hash, MessageCircle, Store, User } from "lucide-react";

const footerNavigation = [
  { icon: Home, label: "ホーム", href: "/" },
  { icon: Hash, label: "タイムライン", href: "/community/cm202aic000033hhcts6nvhns/timeline" },
  // { icon: MessageCircle, label: "メッセージ", href: "/messages" },
  // { icon: Store, label: "ストア", href: "/store" },
  { icon: User, label: "マイページ", href: "/profile" },
];

export default function FooterNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white lg:hidden">
      <div className="flex justify-around">
        {footerNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-gray-900"
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}