import { useAuthStore } from "@/stores/useAuthStore"
import Header from "./components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music } from "lucide-react";
import SongTabContent from "./components/SongTabContent";
import AlbumTabContent from "./components/AlbumTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import DashboardStats from "./components/DashBoardStats";


const AdminPage = () => {

    const {isAdmin, isLoading} = useAuthStore();

    const {fetchAlbums, fetchSongs, fetchStats} = useMusicStore();

    useEffect(()=>{
        fetchAlbums();
        fetchSongs();   
        fetchStats();
    }, [fetchAlbums, fetchSongs, fetchStats]);

    if(!isLoading && !isAdmin) 
        return <div>You are not an admin</div>


  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
        <Header/>

        <DashboardStats/>

        <Tabs defaultValue="songs" className="space-y-6">
            <TabsList className="p-1 bg-zinc-800/50">
                <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700">
                    <Music className="mr-2 size-4"/>
                    Songs
                </TabsTrigger>

                <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700">
                    <Music className="mr-2 size-4"/>
                    Albums
                </TabsTrigger>
            </TabsList>

            {/* content */}
            <TabsContent value="songs">
                <SongTabContent/>
            </TabsContent>
            <TabsContent value="songs">
                <AlbumTabContent/>
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default AdminPage