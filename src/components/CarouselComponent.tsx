import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import imageCasa from '@/assets/img/casaCarousel.avif'

export function CarouselComponent() {
  const itens = [
    {
      frase:
        'Encontre a casa dos seus sonhos em Angola! Compra e arrendamento de imóveis com toda a facilidade e segurança.',
      imagem: { imageCasa },
    },
    {
      frase:
        'Descubra apartamentos modernos e casas espaçosas nas melhores localizações de Angola, com opções de pagamento flexíveis.',
      imagem: { imageCasa },
    },
    {
      frase:
        'A sua nova morada espera por si! Oferecemos as melhores oportunidades de compra e aluguer de imóveis em Angola.',
      imagem: { imageCasa },
    },
    {
      frase:
        'Do centro urbano aos bairros residenciais, temos o imóvel perfeito para si. Encontre já a sua nova casa!',
      imagem: { imageCasa },
    },
    {
      frase:
        'Alugar ou comprar imóveis em Angola nunca foi tão simples! Explore as melhores ofertas com um clique.',
      imagem: { imageCasa },
    },
  ]

  return (
    <div className='px-4'>
    <Carousel opts={{loop:true}} className='w-[95%] md:w-[90%] lg:w-[90%] mx-auto'>
      <CarouselContent>
        {itens.map((item, index) => (
          <CarouselItem key={index}>
            <div className='p-2'>
              <Card className='bg-primary-foreground'>
                <CardContent className='flex flex-col items-center justify-center p-4'>
                  <img
                    src={imageCasa}
                    alt={`Imagem ${index + 1}`}
                    className='w-full h-60 object-cover rounded-md mb-4'
                  />
                  <span className='text-sm font-semibold text-center'>
                    {item.frase}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden sm:flex' />
      <CarouselNext  className='hidden sm:flex' />
    </Carousel>
    </div>
  )
}
