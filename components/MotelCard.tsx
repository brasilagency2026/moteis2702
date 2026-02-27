import Image from 'next/image'
import Link from 'next/link'
import { Motel } from '@/types'
import { MapPin, MessageCircle, Navigation, Phone, Star } from 'lucide-react'

export default function MotelCard({ motel, distance }: { motel: Motel, distance?: number }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-zinc-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <Link href={`/motel/${motel.id}`} className="relative h-56 w-full block overflow-hidden">
        <Image 
          src={motel.photos[0] || 'https://picsum.photos/800/600'} 
          alt={motel.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {motel.plan === 'premium' && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Star size={12} fill="currentColor" />
            PREMIUM
          </div>
        )}
        {distance !== undefined && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
            <MapPin size={12} />
            {distance.toFixed(1)} km
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/motel/${motel.id}`}>
          <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">{motel.name}</h3>
        </Link>
        <p className="text-sm text-zinc-500 mb-4 line-clamp-2 flex-grow">{motel.address}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
          <div className="flex gap-2">
            <a 
              href={`https://wa.me/${motel.whatsapp.replace(/\D/g, '')}`} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors"
              title="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <a 
              href={`https://waze.com/ul?ll=${motel.lat},${motel.lng}&navigate=yes`} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
              title="Navegar com Waze"
            >
              <Navigation size={20} />
            </a>
          </div>
          
          <Link 
            href={`/motel/${motel.id}`}
            className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            Ver mais &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
