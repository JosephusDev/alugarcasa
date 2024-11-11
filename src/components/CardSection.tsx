import { Card, CardContent } from '@/components/ui/card'
import { formatar } from '@/functions/formatarMoeda'
import { DollarSign, MapPin, PhoneCall, Tags } from 'lucide-react'
import { MeuModal } from './MeuModal'

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

export function CardSection({ propriedades }: CardSectionProps) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 px-4'>
      {propriedades?.map((p) => {
        return (
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
                children={
                  <img src={p.imagem} alt={p.descricao} className='w-full' />
                }
              />
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
        )
      })}
    </div>
  )
}
