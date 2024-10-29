import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { Textarea } from "./ui/textarea"

export function ModalCadastro() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-4" variant="outline"><PlusCircle/> Adicionar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60%px]">
        <DialogHeader>
          <DialogTitle>Adicionar Propriedade</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-rows-1 gap-1">
            <Label htmlFor="descricao" className="text-right">Descrição da casa</Label>
            <Textarea id="descricao"  className="col-span-3"/>
          </div>
          <div className="grid grid-rows-1 gap-1">
            <Label htmlFor="cidade" className="text-right">Cidade</Label>
            <Input id="cidade" className="col-span-3" />
          </div>
          <div className="grid grid-rows-1 gap-1">
            <Label htmlFor="bairro" className="text-right">Bairro</Label>
            <Input id="bairro" className="col-span-3" />
          </div>
          <div className="grid grid-rows-1 gap-1">
            <Label htmlFor="preco" className="text-right">Preço</Label>
            <Input type="number" id="preco" className="col-span-3" />
          </div>
          <div className="grid grid-rows-1 gap-1">
            <Label htmlFor="imagem" className="text-right">Imagem</Label>
            <Input type="file" id="imagem" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Cadastrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
