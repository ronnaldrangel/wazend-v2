import { StoreApi, create } from "zustand"
import { persist } from "zustand/middleware"

export interface Profile {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
    isAdmin: boolean
    isVerified: boolean
}

export interface ProfileStore extends StoreApi<Profile> {
    getProfile: () => Profile
    setProfile: (profile: Profile) => void
}

export const useProfileStore = create<ProfileStore>()(
    persist(
        (set, get) => ({
            getProfile: () => get().getState(),
            setProfile: (profile) => set({ ...get().getState(), ...profile }),
        }),
        {
            name: "profile",
            getStorage: () => localStorage,
        },
    ),
)