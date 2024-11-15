import { Search } from 'lucide-react'
import { Input } from './ui/input'

interface InputSearchProps {
  onSearchChange: (search: string) => void
}

export function InputSearch({ onSearchChange }: InputSearchProps) {
  return (
    <div className='w-full justify-center items-center text-center my-10'>
      <h1 className='text-2xl font-bold px-4'>Pesquisa</h1>
      <div className='w-[80%] md:w-[60%] sm:w-[40%] p-4 relative mx-auto'>
        <Input
          id='search'
          placeholder='Pesquisar...'
          className='pl-8'
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Search className='pointer-events-none absolute left-6 top-1/2 size-4 -translate-y-1/2 select-none opacity-50' />
      </div>
    </div>
  )
}
