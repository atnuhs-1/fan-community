interface CommunityHeaderProps {
  name?: string;
  description?: string | null;
}

export function CommunityHeader({ name, description }: CommunityHeaderProps) {
  return (
    <div className="p-8 space-y-6">
      <h1 className="font-bold text-2xl border-b pb-1">{name}</h1>
      <p className="text-slate-700 line-clamp-4">{description}</p>
    </div>
  );
}