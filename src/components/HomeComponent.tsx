import { useEffect, useState } from "react";
import { CardSection } from "./CardSection";
import { CarouselComponent } from "./CarouselComponent";
import { FooterComponet } from "./FooterComponent";
import { InputSearch } from "./InputSearch";
import Api from "@/api";

interface IPropriedades {
  id: number
  descricao: string
  cidade: string
  bairro: string
  preco: number
  contato: string
  imagem: string
}

export function HomeComponent() {
  const [propriedades, setPropriedades] = useState<IPropriedades[]>([])

  useEffect(() => {
    const getPropriedades = async () => {
      const token = localStorage.getItem('token')
      await Api.get('/propriedade', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response)=>{
        setPropriedades(response.data)
      })
    }
    getPropriedades()
  }, [])
  return (
    <>
      <CarouselComponent/>
      <InputSearch />
      <CardSection propriedades={propriedades}/>
      <FooterComponet />
    </>
  )
}
