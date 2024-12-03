import CreateCommunityForm from '@/components/CreateCommunityForm';

export default function CreateCommunityPage() {
  return (
    <div className='w-full h-full p-4 rounded-lg shadow-lg bg-white'>
      <h1 className='font-bold text-3xl'>Create a New Community</h1>
      <CreateCommunityForm />
    </div>
  );
}