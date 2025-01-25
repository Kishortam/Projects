import { axiosInstance } from "@/lib/axios";
import {create} from "zustand";

interface ChatStore {
    users: any[];
    fetchUsers: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}


// to fetch users
export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async() => {
        set({isLoading: true, error: null});

        try {
            const respone = await axiosInstance.get("/users");
            set({users: respone.data});
        } catch (error:any) {
            set({error: error.response.data.message});
        }
        finally {
            set({isLoading: false});
        }
    }
}))