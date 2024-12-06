// components/header.tsx
import { Logo } from "./logo";
import { ActionButtons } from "./action-button";
import { SearchInput } from "./search-input";

export default function Header() {
  return (
    <>
      {/* デスクトップヘッダー */}
      <header className="fixed z-20 hidden w-full lg:block">
        <div className="h-[60px] border-b bg-white">
          <div className="mx-auto h-full max-w-screen-xl px-4">
            <div className="flex h-full items-center justify-between">
              <div className="flex items-center gap-8">
                {/* <Logo /> */}
                <h1 className="font-bold font-serif text-2xl">FanSync</h1>
                {/* <SearchInput /> */}
              </div>
              {/* <ActionButtons /> */}
            </div>
          </div>
        </div>
      </header>

      {/* モバイルヘッダー */}
      <header className="fixed z-20 w-full lg:hidden">
        <div className="h-[48px] border-b bg-white">
          <div className="mx-auto h-full px-4">
            <div className="flex h-full items-center justify-between">
              {/* <Logo /> */}
              <h1 className="font-bold font-serif text-2xl">FanSync</h1>
              {/* <ActionButtons /> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
