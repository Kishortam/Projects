import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
import {create} from "zustand";

interface MusicStore{
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string| null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];
    stats: Stats;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;  // to fetch album by id
    fetchFeaturedSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
    
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    madeForYouSongs: [],
    trendingSongs: [],
    featuredSongs: [],
    stats:{
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtists: 0
    },

deleteSong: async(id) =>{
    set({isLoading: true, error: null});
    try{
        await axiosInstance.delete(`/admin/songs/${id}`);

        set(state =>({
            songs: state.songs.filter(song => song._id !== id)
        }))
        toast.success("Song deleted successfully");
    }
    catch(error:any){
        toast.error("Error deleting song");
    }
    finally{
        set({isLoading: false});
    }
},

deleteAlbum: async(id) =>{
    set({isLoading: true, error: null});
    try{
        await axiosInstance.delete(`/admin/albums/${id}`);

        set(state =>({
            albums: state.albums.filter(album => album._id !== id),
            songs: state.songs.map((song)=> 
            song.albumId === state.albums.find((album) => album._id === id)?.title ? {...song, albumId: null}: song),
        }))
        toast.success("Album deleted successfully");
    }
    catch(error:any){
        toast.error("Failed to delete Album " + error.message);
    }
    finally{
        set({isLoading: false});
    }
},


    fetchSongs: async() =>{
        set({isLoading: true, error: null});

        try{
            const response = await axiosInstance.get("/songs");
            set({songs: response.data});
        }
        catch(error:any){
            set({error: error.message});
        }
        finally{
            set({isLoading: false});
        }
    },



    fetchStats: async() =>{
        set({isLoading: true, error: null});

            try{
                const response = await axiosInstance.get("/stats");
                set({stats: response.data});
            }
            catch(error:any){
                set({error: error.message});
            }
            finally{
                set({isLoading: false});
            }
        },



    fetchAlbums: async() =>{
        set({isLoading: true, error: null});

        try{
            const response = await axiosInstance.get("/albums");
            set({albums: response.data});
        }
        catch(error:any){
            set({error: error.response.data.message});
        }
        finally{
            set({isLoading: false});
        }
    },

    fetchAlbumById: async(id) =>{ // to fetch album by id
        set({isLoading: true, error: null});

        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({currentAlbum: response.data});
        } catch (error:any) {
            set({error: error.response.data.message});
        } finally {
            set({isLoading: false});
        }  
    },

    fetchFeaturedSongs: async() =>{ // to fetch featured songs
        set({isLoading: true, error: null});

        try {    
            const response = await axiosInstance.get("/songs/featured");
            set({featuredSongs: response.data});
        } catch (error:any) {
            set({error: error.response.data.message});
        } finally {
            set({isLoading: false});
        }
    },

    fetchMadeForYouSongs: async() =>{ // to fetch made for you songs
        set({isLoading: true, error: null});

        try {    
            const response = await axiosInstance.get("/songs/made-for-you");
            set({madeForYouSongs: response.data});
        } catch (error:any) {
            set({error: error.response.data.message});
        } finally {
            set({isLoading: false});
        }
    },

    fetchTrendingSongs: async() =>{ // to fetch trending songs
        set({isLoading: true, error: null});

        try {    
            const response = await axiosInstance.get("/songs/trending");
            set({trendingSongs: response.data});
        } catch (error:any) {
            set({error: error.response.data.message});
        } finally {
            set({isLoading: false});
        }  
    }, 
}))