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
                <h2 className="text-sm uppercase tracking-[0.3em] font-sans font-semibold text-accent mb-6">Nuestra Filosofía</h2>
                <p className="text-3xl md:text-5xl font-serif text-dark leading-snug">
                    "Creemos en el valor de lo <span className="text-primary-hover font-bold">artesanal</span>. Cada bizcochuelo lo horneamos con los mejores ingredientes y total dedicación, para que la frescura llegue directo a tu mesa."
                </p>
                <div className="mt-12 w-16 h-1 bg-primary mx-auto rounded-full"></div>
            </motion.div>
        </section>
    );
};
