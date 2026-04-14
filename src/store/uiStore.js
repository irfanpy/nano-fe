// Zustand store for global UI state (sidebar, modals, toasts)
import { create } from 'zustand'

const useUIStore = create((set) => ({
  sidebarOpen: false,
  activeModal: null,
  toasts:      [],

  toggleSidebar:  ()      => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  openModal:      (name)  => set({ activeModal: name }),
  closeModal:     ()      => set({ activeModal: null }),
  addToast:       (toast) => set((s) => ({ toasts: [...s.toasts, { id: Date.now(), ...toast }] })),
  removeToast:    (id)    => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

export default useUIStore
