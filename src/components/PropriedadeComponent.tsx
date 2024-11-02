import { useEffect, useState } from "react";
import Api from "@/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { MeuModal } from "./MeuModal";
import { Trash } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface IPropriedades{
    id: number;
    descricao: string;
    cidade: string;
    bairro: string;
    preco: string;
    imagem: string;
}

export default function PropriedadeComponent() {

    const [propriedades, setPropriedades] = useState<IPropriedades[]>([]);
    const [search, setSearch] = useState("");

    // Função para buscar os dados
    const getPropriedades = async () => {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        try {
            const response = await Api.get(`/propriedade/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const fetchedData = response.data;
            setPropriedades(fetchedData);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        getPropriedades();
    }, []);

    const filteredPropriedades = search ? propriedades?.filter((p)=>p.descricao.toLowerCase().includes(search.toLowerCase())) : propriedades
    

    return (
        <>
            <div className="m-4 p-4 gap-4">
                <div className="gap-4 m-4 p-4">
                    <div className="my-5">
                        <h1 className="text-3xl font-bold">Gerencie suas propriedades</h1>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div>
                            <Input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Pesquisar" />
                        </div>
                        <div>
                            <MeuModal 
                                buttonTitle="Adicionar"
                                children={
                                    <>
                                        <div className="grid grid-rows-1 gap-1">
                                            <Label htmlFor="descricao">Descrição da casa</Label>
                                            <Textarea id="descricao"  className="col-span-3"/>
                                        </div>
                                        <div className="grid grid-rows-1 gap-1">
                                            <Label htmlFor="cidade">Cidade</Label>
                                            <Input id="cidade" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-rows-1 gap-1">
                                            <Label htmlFor="bairro">Bairro</Label>
                                            <Input id="bairro" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-rows-1 gap-1">
                                            <Label htmlFor="preco">Preço</Label>
                                            <Input type="number" id="preco" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-rows-1 gap-1">
                                            <Label htmlFor="imagem">Imagem</Label>
                                            <Input type="file" id="imagem" className="col-span-3" />
                                        </div>
                                    </>
                                }
                            />
                        </div>
                    </div>

                    <div className="pt-10">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Cidade</TableHead>
                                    <TableHead>Bairro</TableHead>
                                    <TableHead>Preço</TableHead>
                                    <TableHead>Imagem</TableHead>
                                    <TableHead>Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPropriedades.length > 0 ? filteredPropriedades.map((prop, index) => (
                                    <TableRow key={prop.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{prop.descricao}</TableCell>
                                        <TableCell>{prop.cidade}</TableCell>
                                        <TableCell>{prop.bairro}</TableCell>
                                        <TableCell>{prop.preco}</TableCell>
                                        <TableCell>{prop.imagem}</TableCell>
                                        <TableCell>{<Trash size={15} />}</TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell className="text-center py-5 font-bold" colSpan={7}><h1 className="text-lg">Nenhuma propriedade encontrada</h1></TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}
