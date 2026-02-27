import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
    MapPin,
    MessageCircle,
    Navigation,
    Phone,
    Star,
    Clock,
    Wifi,
    Tv,
    Music,
    Thermometer,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react'
import MotelMapDynamic from '@/components/MotelMapDynamic'
import ImageCarousel from '@/components/ImageCarousel'
import { Motel } from '@/types'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function MotelDetailsPage({ params }: PageProps) {
    const { id } = await params
    const supabase = await createClient()

    const { data: motelData, error } = await supabase
        .from('motels')
        .select('*')
        .eq('id', id)
        .single()

    // Handle mock cases for demonstration if DB is empty
    let motel: Motel | null = motelData as Motel

    if (!motel && (id === '1' || id === '2')) {
        const mocks: Record<string, Motel> = {
            '1': {
                id: '1',
                name: 'Motel Exemplo Premium',
                address: 'Av. das Nações Unidas, 12345 - São Paulo, SP',
                lat: -23.5505,
                lng: -46.6333,
                plan: 'premium',
                status: 'active',
                photos: [
                    'https://picsum.photos/seed/motel1/1200/800',
                    'https://picsum.photos/seed/motel1b/1200/800',
                    'https://picsum.photos/seed/motel1c/1200/800'
                ],
                whatsapp: '11999999999',
                phone: '1155555555',
                description: 'Um motel de luxo para momentos especiais. Oferecemos o que há de melhor em conforto e discrição em São Paulo.',
                owner_id: 'system',
                created_at: new Date().toISOString(),
                hours: '24h',
                periods: { twoHours: '100', fourHours: '180', twelveHours: '350' },
                services: ['Ar condicionado', 'Hidromassagem', 'Cama King', 'Wi-Fi Grátis'],
                accessories: ['Frigobar', 'Smart TV', 'Som Bluetooth', 'Iluminação LED'],
                tripadvisor: ''
            },
            '2': {
                id: '2',
                name: 'Motel Conforto',
                address: 'Rua das Flores, 456 - São Paulo, SP',
                lat: -23.5605,
                lng: -46.6433,
                plan: 'free',
                status: 'active',
                photos: [
                    'https://picsum.photos/seed/motel2/1200/800',
                    'https://picsum.photos/seed/motel2b/1200/800'
                ],
                whatsapp: '11888888888',
                phone: '1144444444',
                description: 'Conforto e discrição com o melhor preço da região. Quartos higienizados e atendimento rápido.',
                owner_id: 'system',
                created_at: new Date().toISOString(),
                hours: '24h',
                periods: { twoHours: '70', fourHours: '120', twelveHours: '250' },
                services: ['Ar condicionado', 'TV por assinatura'],
                accessories: ['Frigobar'],
                tripadvisor: ''
            }
        }
        motel = mocks[id]
    }

    if (!motel) {
        notFound()
    }

    return (
        <div className="bg-zinc-50 min-h-screen pb-20">
            {/* Header Content */}
            <div className="container mx-auto px-4 pt-24 pb-12">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="flex items-center gap-2 bg-white shadow-sm text-zinc-900 px-4 py-2 rounded-full hover:bg-zinc-50 transition-all border border-zinc-200"
                        >
                            <ArrowLeft size={18} />
                            <span className="font-bold text-sm">Voltar</span>
                        </Link>
                        {motel.plan === 'premium' && (
                            <span className="bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                <Star size={12} fill="currentColor" />
                                PREMIUM
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter">{motel.name}</h1>
                    <p className="text-zinc-500 flex items-center gap-2 text-sm md:text-base font-medium">
                        <MapPin size={18} className="text-red-500 shrink-0" />
                        {motel.address}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Description */}
                        <section className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Sobre o Motel</h2>
                            <p className="text-zinc-600 leading-relaxed text-lg">{motel.description}</p>
                        </section>

                        {/* Features/Amenities */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
                                <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="text-red-600" /> Serviços
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {motel.services.map((service, i) => (
                                        <div key={i} className="flex items-center gap-3 text-zinc-700 font-medium">
                                            <div className="w-2 h-2 rounded-full bg-red-600" />
                                            {service}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
                                <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                    Acessórios
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {motel.accessories.map((acc, i) => (
                                        <div key={i} className="flex items-center gap-3 text-zinc-700 font-medium">
                                            <div className="w-2 h-2 rounded-full bg-zinc-300" />
                                            {acc}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Carousel Gallery */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Galeria de Fotos</h2>
                            <ImageCarousel images={motel.photos} alt={motel.name} />
                        </section>

                        {/* Interactive Map */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-6 font-primary">Localização</h2>
                            <MotelMapDynamic motels={[motel]} userLocation={null} />
                        </section>
                    </div>

                    {/* Sidebar - CTA */}
                    <div className="space-y-6">
                        <div className="sticky top-24 space-y-6">

                            {/* Action Card */}
                            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-zinc-100 overflow-hidden relative">
                                <h2 className="text-2xl font-black text-zinc-900 mb-6">Entre em Contato</h2>

                                <div className="space-y-4">
                                    <a
                                        href={`https://wa.me/${motel.whatsapp.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-green-200"
                                    >
                                        <MessageCircle size={22} />
                                        Falar via WhatsApp
                                    </a>
                                    <a
                                        href={`https://waze.com/ul?ll=${motel.lat},${motel.lng}&navigate=yes`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-3 w-full bg-lightBlue-600 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-md"
                                    >
                                        <Navigation size={22} />
                                        Ir com Waze
                                    </a>
                                    <a
                                        href={`tel:${motel.phone}`}
                                        className="flex items-center justify-center gap-3 w-full bg-zinc-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all"
                                    >
                                        <Phone size={22} />
                                        Ligar Agora
                                    </a>
                                </div>
                            </div>

                            <div className="bg-zinc-900 p-6 rounded-3xl text-white">
                                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Funcionamento</p>
                                <div className="flex items-center gap-2">
                                    <Clock className="text-red-500" size={18} />
                                    <span className="font-bold text-lg">{motel.hours}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Sticky Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-zinc-200 p-4 flex gap-3 lg:hidden z-[100]">
                <a
                    href={`https://wa.me/${motel.whatsapp.replace(/\D/g, '')}`}
                    className="flex-1 bg-green-600 text-white font-black py-4 rounded-2xl text-center flex items-center justify-center gap-2 text-sm"
                >
                    <MessageCircle size={18} />
                    WHATSAPP
                </a>
                <a
                    href={`https://waze.com/ul?ll=${motel.lat},${motel.lng}&navigate=yes`}
                    className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl text-center flex items-center justify-center gap-2 text-sm"
                >
                    <Navigation size={18} />
                    WAZE
                </a>
            </div>
        </div>
    )
}
