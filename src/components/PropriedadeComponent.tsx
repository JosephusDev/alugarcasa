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
import {
  AlertCircle,
  CheckCircle,
  Image,
  PlusCircle,
  Trash,
} from 'lucide-react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import { formatar } from '@/functions/formatarMoeda'

interface IPropriedades {
  id: number
  descricao: string
  cidade: string
  bairro: string
  preco: number
  imagem: string
}

export function PropriedadeComponent() {
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

  const limparCampos = () => {
    setDescricao('')
    setCidade('')
    setBairro('')
    setPreco('')
    setImagem('')
  }

  const cadastrarPropriedade = async () => {
    if (descricao && cidade && bairro && preco && imagem) {
      const id_usuario = localStorage.getItem('id')
      const token = localStorage.getItem('token')
      await Api.post(
        `/propriedade`,
        { descricao, cidade, bairro, preco, imagem, id_usuario },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
        .then((response) => {
          getPropriedades()
          toast({
            description: (
              <div className='flex gap-2'>
                <CheckCircle size={15} />
                <h2>{response.data.message}</h2>
              </div>
            ),
          })
        })
        .catch((error) => {
          console.error('Erro ao cadastrar propriedade:', error)
          toast({
            description: 'Erro ao cadastrar propriedade',
            variant: 'destructive',
          })
        })
        .finally(() => limparCampos())
    } else {
      toast({
        description: (
          <div className='flex gap-2'>
            <AlertCircle size={18} />
            <h2>Preencha todos os campos</h2>
          </div>
        ),
        variant: 'destructive',
      })
    }
  }

  const deletePropriedade = async (id: number) => {
    const token = localStorage.getItem('token')
    await Api.delete(`/propriedade/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setPropriedades((prevState) =>
          prevState.filter((prop) => prop.id !== id),
        )
        toast({
          description: (
            <div className='flex gap-2'>
              <CheckCircle size={15} />
              <h2>{response.data.message}</h2>
            </div>
          ),
        })
      })
      .catch((error) => {
        console.error('Erro ao excluir propriedade:', error)
        toast({
          description: 'Erro ao excluir propriedade',
        })
      })
  }

  useEffect(() => {
    getPropriedades()
  }, [])

  const filteredPropriedades =
    search && propriedades.length > 0
      ? propriedades?.filter(
          (p) =>
            p.descricao.toLowerCase().includes(search.toLowerCase()) ||
            p.bairro.toLowerCase().includes(search.toLowerCase()),
        )
      : propriedades

  return (
    <div className='gap-4 px-4 w-full mt-14'>
      <div className='my-5'>
        <h1 className='text-xl sm:text-3xl font-bold'>
          Gerencie suas propriedades
        </h1>
      </div>
      <div className='flex justify-between items-center gap-4'>
        <div className='w-full sm:w-auto'>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            placeholder='Pesquisar'
          />
        </div>
        <div>
          <MeuModal
            title='Adicionar Propriedade'
            buttonTitle='Adicionar'
            trigger={
              <Button className='gap-2'>
                <PlusCircle size={15} />{' '}
                <span className='hidden sm:flex'>Adicionar</span>
              </Button>
            }
            children={
              <>
                <div className='grid grid-rows-1 gap-1'>
                  <Label htmlFor='descricao'>Descrição da casa</Label>
                  <Textarea
                    onChange={(e) => setDescricao(e.target.value)}
                    id='descricao'
                    value={descricao}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-rows-1 gap-1'>
                  <Label htmlFor='cidade'>Cidade</Label>
                  <Input
                    onChange={(e) => setCidade(e.target.value)}
                    id='cidade'
                    value={cidade}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-rows-1 gap-1'>
                  <Label htmlFor='bairro'>Bairro</Label>
                  <Input
                    onChange={(e) => setBairro(e.target.value)}
                    id='bairro'
                    value={bairro}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-rows-1 gap-1'>
                  <Label htmlFor='preco'>Preço</Label>
                  <Input
                    onChange={(e) => setPreco(e.target.value)}
                    type='number'
                    id='preco'
                    value={preco}
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-rows-1 gap-1'>
                  <Label htmlFor='imagem'>Imagem</Label>
                  <Input
                    onChange={(e) => setImagem(e.target.value)}
                    id='imagem'
                    value={imagem}
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
                  <TableCell className='whitespace-nowrap'>
                    {prop.descricao}
                  </TableCell>
                  <TableCell className='whitespace-nowrap'>
                    {prop.cidade}
                  </TableCell>
                  <TableCell className='whitespace-nowrap'>
                    {prop.bairro}
                  </TableCell>
                  <TableCell className='whitespace-nowrap'>
                    {formatar(prop.preco)}
                  </TableCell>
                  <TableCell className='whitespace-nowrap'>
                    <MeuModal
                      visibleFooter={false}
                      title='Imagem da casa'
                      trigger={
                        <Button variant={'ghost'}>
                          <Image size={15} />
                        </Button>
                      }
                      children={
                        <img
                          src={prop.imagem}
                          alt={prop.descricao}
                          className='w-full'
                        />
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <MeuModal
                      title='Aviso'
                      trigger={
                        <Button variant={'ghost'}>
                          <Trash size={15} />
                        </Button>
                      }
                      buttonTitle='Confirmar'
                      onClick={() => deletePropriedade(prop.id)}
                      visibleFooter={true}
                      children={
                        <p className='text-center text-lg'>
                          Deseja realmente eliminar?
                        </p>
                      }
                      typeButton='destructive'
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className='text-center py-5 font-bold' colSpan={7}>
                  <h1 className='text-sm sm:text-lg'>
                    Nenhuma propriedade encontrada
                  </h1>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
