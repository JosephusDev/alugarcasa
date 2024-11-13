import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import imageA from '@/assets/img/a.svg'
import imageB from '@/assets/img/b.svg'
import imageC from '@/assets/img/c.svg'

export function CarouselComponent() {
  const itens = [
    {
      frase:
        'Encontre a casa dos seus sonhos em Angola! Compra e arrendamento de imóveis com toda a facilidade e segurança.',
      imagem: imageA,
    },
    {
      frase:
        'Descubra apartamentos modernos e casas espaçosas nas melhores localizações de Angola, com opções de pagamento flexíveis.',
      imagem: imageB,
    },
    {
      frase:
        'A sua nova morada espera por si! Oferecemos as melhores oportunidades de compra e aluguer de imóveis em Angola.',
      imagem: imageC,
    },
  ]

  return (
    <div className='px-4 mt-14'>
    <Carousel opts={{loop:true}} className='w-[95%] md:w-[90%] lg:w-[90%] mx-auto'>
      <CarouselContent>
        {itens.map((item, index) => (
          <CarouselItem key={index}>
            <div className='p-2'>
              <Card className='bg-primary-foreground'>
                <CardContent className='flex flex-col items-center justify-center p-4'>
                  <img
                    src={item.imagem}
                    alt={`Imagem ${index + 1}`}
                    className='w-full h-60 sm:w-96 sm:h-96 object-cover rounded-md mb-4'
                  />
                  <span className='text-pretty sm:text-lg text-center sm:w-2/3'>
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
