import { useEffect, useState } from 'react'
import Api from '@/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Input } from './ui/input'
import { MeuModal } from './MeuModal'
import { Trash } from 'lucide-react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import * as SelectPrimitive from '@radix-ui/react-select'

interface IPropriedades {
  id: number
  descricao: string
  cidade: string
  bairro: string
  preco: string
  imagem: string
}

export default function PropriedadeComponent() {
  const { toast } = useToast()

  const [propriedades, setPropriedades] = useState<IPropriedades[]>([])
  const [search, setSearch] = useState('')
  const [descricao, setDescricao] = useState('')
  const [cidade, setCidade] = useState('')
  const [bairro, setBairro] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState('')

  // Função para buscar os dados
  const getPropriedades = async () => {
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    try {
      const response = await Api.get(`/propriedade/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const fetchedData = response.data
      setPropriedades(fetchedData)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  const cadastrarPropriedade = async () => {
    const id_usuario = localStorage.getItem('id')

    const token = localStorage.getItem('token')
    try {
      const response = await Api.post(
        `/propriedade`,
        { descricao, cidade, bairro, preco, imagem, id_usuario },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      const resposta = response.data.message
      toast({
        description: resposta,
      })
      getPropriedades()
    } catch (error) {
      console.error('Erro ao cadastrar propriedade:', error)
      toast({
        description: 'Erro ao cadastrar propriedade',
      })
    }
  }

  const deletePropriedade = async (id: number) => {
    const token = localStorage.getItem('token')
    try {
      const response = await Api.delete(`/propriedade/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const resposta = response.data.message
      toast({
        description: resposta,
      })

      setPropriedades((prevState) => prevState.filter((prop) => prop.id !== id))
    } catch (error) {
      console.error('Erro ao excluir propriedade:', error)
      toast({
        description: 'Erro ao excluir propriedade',
      })
    }
  }

  useEffect(() => {
    getPropriedades()
  }, [])

  const filteredPropriedades = search
    ? propriedades?.filter((p) =>
        p.descricao.toLowerCase().includes(search.toLowerCase()),
      )
    : propriedades

  return (
    <div className='m-4 p-4 gap-4'>
      <div className='gap-4 m-4 p-4'>
        <div className='my-5'>
          <h1 className='text-3xl font-bold'>Gerencie suas propriedades</h1>
        </div>
        <div className='flex justify-between items-center gap-4'>
          <div>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              type='text'
              placeholder='Pesquisar'
            />
          </div>
          <div>
            <MeuModal
              buttonTitle='Adicionar'
              children={
                <>
                  <div className='grid grid-rows-1 gap-1'>
                    <Label htmlFor='descricao'>Descrição da casa</Label>
                    <Textarea
                      onChange={(e) => setDescricao(e.target.value)}
                      id='descricao'
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-rows-1 gap-1'>
                    <Label htmlFor='cidade'>Cidade</Label>
                    <Input
                      onChange={(e) => setCidade(e.target.value)}
                      id='cidade'
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-rows-1 gap-1'>
                    <Label htmlFor='bairro'>Bairro</Label>
                    <Input
                      onChange={(e) => setBairro(e.target.value)}
                      id='bairro'
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-rows-1 gap-1'>
                    <Label htmlFor='preco'>Preço</Label>
                    <Input
                      onChange={(e) => setPreco(e.target.value)}
                      type='number'
                      id='preco'
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-rows-1 gap-1'>
                    <Label htmlFor='imagem'>Imagem</Label>
                    <Input
                      onChange={(e) => setImagem(e.target.value)}
                      id='imagem'
                      className='col-span-3'
                    />
                  </div>
                </>
              }
              onClick={cadastrarPropriedade}
            />
          </div>
        </div>
        <div className='pt-10'>
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
              {filteredPropriedades.length > 0 ? (
                filteredPropriedades.map((prop, index) => (
                  <TableRow key={prop.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{prop.descricao}</TableCell>
                    <TableCell>{prop.cidade}</TableCell>
                    <TableCell>{prop.bairro}</TableCell>
                    <TableCell>{prop.preco}</TableCell>
                    <TableCell>{prop.imagem}</TableCell>
                    <TableCell>
                      <Button
                        variant={'outline'}
                        onClick={() => deletePropriedade(prop.id)}
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className='text-center py-5 font-bold' colSpan={7}>
                    <h1 className='text-lg'>Nenhuma propriedade encontrada</h1>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
