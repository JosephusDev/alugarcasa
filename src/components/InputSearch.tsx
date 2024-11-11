import { Search } from "lucide-react";
import { Input } from "./ui/input";


export function InputSearch(){
    return (
        <>
            <div className="w-full justify-center items-center text-center">
                <h1 className="text-2xl px-4">Pesquisa</h1>
                <div className="w-[80%] md:w-[60%] sm:w-[40%] p-4 relative mx-auto">
                        <Input
                            id="search"
                            placeholder="Pesquisar casas..."
                            className="pl-8"
                        />
                        <Search className="pointer-events-none absolute left-6 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </div>
            </div>
        </>
    )
}