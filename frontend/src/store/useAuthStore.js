import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
        } catch (error) {
            console.log("Error in authCheck:", error)
            set({authUser:null})
        } finally{
            set({isCheckingAuth: false})
        }
    },

  //   signup: async (data) => {
  //   set({ isSigningUp: true });
  //   try {
  //     const res = await axiosInstance.post("/auth/signup", data);
  //     set({ authUser: res.data });

  //     toast.success("Account created successfully!");
  //     get().connectSocket();
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   } finally {
  //     set({ isSigningUp: false });
  //   }
  // },  
  signup: async (data) => {
  set({ isSigningUp: true });
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    set({ authUser: res.data });

    toast.success("Account created successfully!");
    get().connectSocket?.(); // use optional chaining in case connectSocket isn't defined yet
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    toast.error(message);
  } finally {
    set({ isSigningUp: false });
  }
},
}))