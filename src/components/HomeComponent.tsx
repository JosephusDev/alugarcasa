import { useEffect, useState } from 'react'
import { CardSection } from './CardSection'
import { CarouselComponent } from './CarouselComponent'
import { FooterComponet } from './FooterComponent'
import { InputSearch } from './InputSearch'
import Api from '@/api'

interface IPropriedades {
  id: number
  descricao: string
  cidade: string
  bairro: string
  preco: string
  contato: string
  imagem: string
}

export function HomeComponent() {
  const [propriedades, setPropriedades] = useState<IPropriedades[]>([])
  const [pesquisarPropriedade, setpesquisarPropriedade] = useState('')

  useEffect(() => {
    const getPropriedades = async () => {
      const token = localStorage.getItem('token')
      await Api.get('/propriedade', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setPropriedades(response.data)
      })
    }
    getPropriedades()
  }, [])
  
 
  const filteredPropriedades =
    pesquisarPropriedade && propriedades.length > 0
      ? propriedades?.filter(
          (p) =>
            p.descricao.toLowerCase().includes(pesquisarPropriedade.toLowerCase()) ||
            p.bairro.toLowerCase().includes(pesquisarPropriedade.toLowerCase()) ||
            p.preco.includes(pesquisarPropriedade) || 
            p.cidade.toLowerCase().includes(pesquisarPropriedade.toLowerCase())
        )
      : propriedades
  return (
    <>
      <CarouselComponent />
      <InputSearch onSearchChange={setpesquisarPropriedade} />
      <CardSection propriedades={filteredPropriedades} />
      <FooterComponet />
    </>
  )
}
