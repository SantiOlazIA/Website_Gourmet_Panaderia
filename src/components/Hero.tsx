import { motion } from 'framer-motion';

export const Hero = () => {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 overflow-hidden bg-[#FAFAFA]">
            {/* Left side text content */}
            <div className="z-10 flex flex-col items-start justify-center w-full md:w-1/2 pt-20 md:pt-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img src="/logo-transparent.png" alt="El Gourmet Panadería" className="h-48 md:h-72 mb-8 object-contain" />
                    <h1 className="text-5xl md:text-7xl font-sans font-bold text-dark leading-tight tracking-tight mb-4">
                        El sabor de lo nuestro.
                    </h1>
                    <p className="font-serif text-xl md:text-2xl text-dark/80 italic mb-4 max-w-lg">
                        Bizcochuelos caseros, artesanales, de calidad, hechos con amor.
                    </p>
                    <a
                        href="#catalog"
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-dark bg-primary hover:bg-primary-hover rounded-full overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hardware-accelerated"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Ver Especialidades
                        </span>
                    </a>
                </motion.div>
            </div>

            {/* Right side background Parallax/Image */}
            <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-30 md:opacity-100 mt-16 md:mt-0">
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="w-full h-full"
                >
                    <img
                        src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop"
                        alt="Artisanal Bakery Breads"
                        className="w-full h-full object-cover object-center rounded-l-3xl shadow-2xl"
                    />
                </motion.div>
            </div>
        </section>
    );
};
