import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import Rotas from "@/routes";
import { Menu } from "lucide-react";


export default function MainScreen() {
  const {toggleSidebar} = useSidebar()
  return (
    <>
      <AppSidebar />
      <main className="w-full">
        <Button className="m-1" size={"icon"} onClick={toggleSidebar} variant={"ghost"}>
          <Menu size={15}/>
        </Button>
        <Rotas/>
      </main>
    </>
  )
}
