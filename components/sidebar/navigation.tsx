import { Eye, Home, Hash, Bell, Users } from "lucide-react";
import NavButton from "../NavButton";

export default function Navigation() {
  return (
    <>
      <div className="px-4 py-2">
        <Eye className="w-12 h-12" />
      </div>
      <NavButton icon={<Home />} label="ホーム" href="/" />
      <NavButton icon={<Hash />} label="話題を検索" href="/#" />
      <NavButton icon={<Bell />} label="通知" href="/#" />
      <NavButton
        icon={<Users />}
        label="コミュニティ作成"
        href="/community/create"
      />
    </>
  );
}