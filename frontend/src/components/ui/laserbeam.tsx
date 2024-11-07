import { motion } from "framer-motion";

const LaserBeam: React.FC = () => {
    return (
        <motion.div
        className="absolute h-0.5 w-full bg-red-500 rounded-full pointer-events-none"
        initial={{ 
            opacity: 0,
            left: '-100%',
            top: '50%',
            y: '-50%',
        }}
        animate={{
            opacity: [0, 1, 1, 0],
            left: '100%',
        }}
        transition={{
            duration: 0.225,
            ease: 'easeIn',
        }}
        style={{
            boxShadow: '0 0 2px 0.5px rgba(255, 0, 0, 0.7), 0 0 4px 1px rgba(255, 0, 0, 0.5)',
        }}
        >
        <motion.div
            className="absolute top-0 right-0 h-full w-full bg-red-300 rounded-full"
            initial={{ opacity: 0.5, scaleX: 1 }}
            animate={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        </motion.div>
    );
};

export default LaserBeam