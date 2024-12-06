import { create } from 'zustand';

interface CreatePostStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useCreatePost = create<CreatePostStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));