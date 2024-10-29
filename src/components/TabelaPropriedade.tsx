import { useEffect, useState } from "react";
import Api from "@/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { ModalCadastro } from "./ModalCadastro";
import { Trash } from "lucide-react";

export default function TabelaPropriedade() {
    const [data, setData] = useState([]); // Armazena os dados da API

    // Função para buscar os dados
    const getData = async () => {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        try {
            const response = await Api.get(`/propriedade/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const fetchedData = response.data;
            setData(fetchedData); // Define os dados no estado
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    // useEffect para carregar os dados quando o componente for montado
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="m-4 p-4 gap-4">
                <div className="gap-4 m-4 p-4">
                    <div className="flex justify-between items-center gap-4">
                        <div>
                            <Input type="text" placeholder="Pesquisar" />
                        </div>
                        <div>
                            <ModalCadastro />
                        </div>
                    </div>

                    <div>
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
                                {data.map((element) => (
                                    <TableRow key={element['id']}>
                                        <TableCell>{element['id']}</TableCell>
                                        <TableCell>{element['descricao']}</TableCell>
                                        <TableCell>{element['cidade']}</TableCell>
                                        <TableCell>{element['bairro']}</TableCell>
                                        <TableCell>{element['preco']}</TableCell>
                                        <TableCell>{element['imagem']}</TableCell>
                                        <TableCell>{<Trash />}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}
