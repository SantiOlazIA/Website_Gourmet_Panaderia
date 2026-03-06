import { motion } from 'framer-motion';

export const Philosophy = () => {
    return (
        <section className="w-full py-24 px-6 md:px-16 bg-white flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
            >
                <h2 className="text-sm uppercase tracking-[0.3em] font-sans font-semibold text-accent mb-6">Nuestra Especialidad</h2>
                <p className="text-2xl md:text-4xl font-serif text-dark leading-snug">
                    "Realizamos las mejores medialunas, croissant, semitas y criollitos <span className="text-primary-hover font-bold text-highlight">100% de manteca</span>. Además, ofrecemos la más dulce variedad en tortas, tartas, brownies, postres y alfajores rellenos con irresistibles cremas de pistacho, limón, y frutilla."
                </p>
                <div className="mt-12 w-16 h-1 bg-primary mx-auto rounded-full"></div>
            </motion.div>
        </section>
    );
};
