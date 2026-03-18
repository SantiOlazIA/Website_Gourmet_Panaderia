import { MapPin, Clock, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="w-full bg-[#FAFAFA] pt-20 pb-12 px-6 md:px-16 border-t border-primary/20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

                {/* Brand */}
                <div className="md:w-1/3">
                    <img src="/logo-transparent.png" alt="El Gourmet Panadería" className="h-32 mb-6 object-contain" />
                    <p className="text-dark/80 font-serif italic mb-8">
                        El sabor rústico y auténtico de nuestros bizcochuelos caseros.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/panaderia_elgourmet?igsh=MWE5aGxmbDZ2dmQwMA==" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent border border-gray-100 hover:bg-accent hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent border border-gray-100 hover:bg-accent hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md">
                            <Facebook size={24} />
                        </a>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12 pt-4">
                    <div className="space-y-4">
                        <h4 className="text-xl font-serif font-bold text-dark mb-6">Dónde Encontrarnos</h4>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-primary border border-gray-100">
                                <MapPin size={24} />
                            </div>
                            <p className="text-dark/70 font-medium leading-relaxed mt-1 text-sm">
                                <strong className="text-dark">Mañana:</strong> Inmediaciones de Calle N°9 y Manuel Lemos, Depto. Pocito.<br /><br />
                                <strong className="text-dark">Tarde:</strong> Barrio Los Molinos (Bloque C 7), Corrientes entre Jacaranda y Las Flores, Depto. Capital.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xl font-serif font-bold text-dark mb-6">Horarios de Atención</h4>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-primary border border-gray-100">
                                <Clock size={24} />
                            </div>
                            <p className="text-dark/70 font-medium leading-relaxed mt-1 text-sm">
                                Lunes a viernes:<br />
                                06:30 a 11:00 hs<br />
                                18:00 a 20:30 hs<br /><br />
                                Sábados:<br />
                                18:00 a 21:00 hs
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-dark/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-dark/50 text-sm font-medium">© {new Date().getFullYear()} El Gourmet Panadería. Todos los derechos reservados.</p>
                <p className="text-dark/50 text-sm font-medium">Sitio Web por <a href="https://aureadigital.online" target="_blank" rel="noopener noreferrer" className="font-bold text-accent hover:underline">Aurea</a></p>
            </div>
        </footer>
    );
};
