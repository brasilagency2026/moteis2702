'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Motel } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation, Phone, MessageCircle } from 'lucide-react'

// Fix for default marker icon in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function LocationMarker({ userLocation }: { userLocation: [number, number] | null }) {
  const map = useMap()
  
  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 13)
    }
  }, [userLocation, map])

  return userLocation === null ? null : (
    <Marker position={userLocation} icon={icon}>
      <Popup>Você está aqui</Popup>
    </Marker>
  )
}

export default function MotelMap({ motels, userLocation }: { motels: Motel[], userLocation: [number, number] | null }) {
  const defaultCenter: [number, number] = [-23.5505, -46.6333] // São Paulo

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-zinc-200">
      <MapContainer 
        center={userLocation || defaultCenter} 
        zoom={12} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker userLocation={userLocation} />
        
        {motels.map((motel) => (
          <Marker key={motel.id} position={[motel.lat, motel.lng]} icon={icon}>
            <Popup className="custom-popup">
              <div className="w-48">
                <div className="relative h-32 w-full rounded-t-lg overflow-hidden mb-2">
                  <Image 
                    src={motel.photos[0] || 'https://picsum.photos/400/300'} 
                    alt={motel.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg leading-tight mb-1">{motel.name}</h3>
                <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{motel.address}</p>
                
                <div className="flex gap-2 mb-3">
                  <a 
                    href={`https://wa.me/${motel.whatsapp.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 bg-green-500 text-white p-1.5 rounded flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={16} />
                  </a>
                  <a 
                    href={`https://waze.com/ul?ll=${motel.lat},${motel.lng}&navigate=yes`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 bg-blue-500 text-white p-1.5 rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <Navigation size={16} />
                  </a>
                </div>
                
                <Link 
                  href={`/motel/${motel.id}`}
                  className="block w-full text-center bg-red-600 text-white py-1.5 rounded text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Ver Detalhes
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
