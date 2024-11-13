import { Mail, Phone } from 'lucide-react'

export function FooterComponet() {
  return (
    <div className='w-full bottom-0 border-t-2 bg-primary-foreground'>
      <div className='p-2'>
        <div className='grid justify-center text-center'>
          <h1 className='font-bold text-xl pb-2'>Contacte-nos</h1>
          <p className='flex text-sm gap-2 items-center mx-auto'>
            <Phone size={15} /> +244 947 552 466
          </p>
          <p className='flex text-sm gap-2 items-center mx-auto'>
            <Mail size={15} /> fulltech.startup@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}
