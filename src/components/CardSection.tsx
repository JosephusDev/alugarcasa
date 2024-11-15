import { Card, CardContent } from '@/components/ui/card'
import { formatar } from '@/functions/formatarMoeda'
import { DollarSign, MapPin, PhoneCall, Tags } from 'lucide-react'
import { MeuModal } from './MeuModal'
import { useState } from 'react'
import { InputSearch } from './InputSearch'

interface ICardProps {
  id: number
  descricao: string
  cidade: string
  bairro: string
  preco: number
  contato: string
  imagem: string
}

interface CardSectionProps {
  propriedades: ICardProps[]
}

//pesquisarPropriedade
export function CardSection({ propriedades }: CardSectionProps) {
  const [pesquisarPropriedade, setpesquisarPropriedade] = useState('')

  // Função para converter a string de preço para número
  const parsePreco = (preco: string): number => {
    const parsed = parseFloat(preco.replace(/\D/g, ''))
    return isNaN(parsed) ? 0 : parsed
  }

  // Função de filtragem
  const propriedadesFiltradas = propriedades.filter((p) => {
    const consulta = pesquisarPropriedade.toLowerCase()

    // Verificar se o input é um número para buscar por preço
    const isSearchingByPreco = !isNaN(parsePreco(pesquisarPropriedade))

    const descricaoResultado = p.descricao.toLowerCase().includes(consulta)
    const bairroResultado = p.bairro.toLowerCase().includes(consulta)
    const precoResultado = isSearchingByPreco
      ? p.preco <= parsePreco(pesquisarPropriedade)
      : true

    // Buscar por descrição, bairro ou preço máximo
    return descricaoResultado || bairroResultado || precoResultado
  })

  return (
    <div className='px-4 mb-10'>
      {/* Input de Pesquisa */}
      <InputSearch onSearchChange={setpesquisarPropriedade} />

      {/* Renderização dos Cards Filtrados */}
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
        {propriedadesFiltradas.length > 0 ? (
          propriedadesFiltradas.map((p) => (
            <Card key={p.id} className='bg-primary-foreground'>
              <CardContent className='px-0'>
                <MeuModal
                  title={p.descricao}
                  trigger={
                    <img
                      className='w-full h-40 mb-2 rounded'
                      src={p.imagem}
                      alt={p.descricao}
                    />
                  }
                  visibleFooter={false}
                >
                  <img src={p.imagem} alt={p.descricao} className='w-full' />
                </MeuModal>
                <div className='flex gap-2 px-5'>
                  <Tags className='mt-1' color='#9956f6' size={18} />
                  <p>{p.descricao}</p>
                </div>
                <div className='flex gap-2 px-5'>
                  <DollarSign className='mt-1' color='#9956f6' size={18} />
                  <p>{formatar(p.preco)}</p>
                </div>
                <div className='flex gap-2 px-5'>
                  <MapPin className='mt-1' color='#9956f6' size={18} />
                  <p>
                    {p.cidade} - {p.bairro}
                  </p>
                </div>
                <div className='flex gap-2 px-5'>
                  <PhoneCall className='mt-1' color='#9956f6' size={18} />
                  <p>{p.contato}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className='text-center col-span-3'>Nenhuma propriedade encontrada.</p>
        )}
      </div>
    </div>
  )
}
