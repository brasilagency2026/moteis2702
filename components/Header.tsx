import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { LogOut, User } from 'lucide-react'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="https://i.ibb.co/NdHzfGQ6/symbolbdsmtransparent.png" 
            alt="BDSMBRAZIL Logo" 
            width={40} 
            height={40} 
            className="object-contain"
          />
          <span className="font-bold text-xl tracking-wider text-red-600">BDSMBRAZIL</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/owner" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <User size={20} />
                <span className="hidden sm:inline">Painel</span>
              </Link>
              <form action="/auth/signout" method="post">
                <button type="submit" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Entrar / Cadastrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
