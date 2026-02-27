import { createClient } from '@/lib/supabase/server'
import MotelCard from '@/components/MotelCard'
import MotelMapDynamic from '@/components/MotelMapDynamic'
import { Motel } from '@/types'

export default async function Page() {
  const supabase = await createClient()

  const { data: motels, error } = await supabase
    .from('motels')
    .select('*')
    .eq('status', 'active')
    .order('plan', { ascending: false }) // Premium first

  if (error) {
    console.error('Error fetching motels:', error)
  }

  // Mock data if database is empty for demonstration
  const displayMotels: Motel[] = (motels && motels.length > 0) ? motels : [
    {
      id: '1',
      name: 'Motel Exemplo Premium',
      address: 'Av. das Nações Unidas, 12345 - São Paulo, SP',
      lat: -23.5505,
      lng: -46.6333,
      plan: 'premium',
      status: 'active',
      photos: ['https://picsum.photos/seed/motel1/800/600'],
      whatsapp: '11999999999',
      phone: '1155555555',
      description: 'Um motel de luxo para momentos especiais.',
      owner_id: 'system',
      created_at: new Date().toISOString(),
      hours: '24h',
      periods: { twoHours: '100', fourHours: '180', twelveHours: '350' },
      services: ['Ar condicionado', 'Hidromassagem', 'Cama King'],
      accessories: ['Frigobar', 'Smart TV'],
      tripadvisor: ''
    },
    {
      id: '2',
      name: 'Motel Conforto',
      address: 'Rua das Flores, 456 - São Paulo, SP',
      lat: -23.5605,
      lng: -46.6433,
      plan: 'free',
      status: 'active',
      photos: ['https://picsum.photos/seed/motel2/800/600'],
      whatsapp: '11888888888',
      phone: '1144444444',
      description: 'Conforto e discrição com o melhor preço.',
      owner_id: 'system',
      created_at: new Date().toISOString(),
      hours: '24h',
      periods: { twoHours: '70', fourHours: '120', twelveHours: '250' },
      services: ['Ar condicionado', 'TV'],
      accessories: ['Frigobar'],
      tripadvisor: ''
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
              Motéis em <span className="text-red-600">São Paulo</span>
            </h1>
            <p className="text-zinc-500 font-medium">
              {displayMotels.length} motéis encontrados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayMotels.map((motel) => (
              <MotelCard key={motel.id} motel={motel} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Explorar no Mapa</h2>
            <p className="text-zinc-500">Encontre os motéis mais próximos de você</p>
          </div>
          <MotelMapDynamic motels={displayMotels} userLocation={null} />
        </section>
      </div>
    </div>
  )
}
