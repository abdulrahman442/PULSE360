
import { motion } from "motion/react";

function Home() {
  return (
    <main className="py-5">
      <div className="container">
        <motion.h1
          className="fw-bold"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          PULSE360
        </motion.h1>

        <p className="lead">
          Public Health & Healthcare Network
        </p>

        <div className="alert alert-info mt-4">
          Welcome to PULSE360. Your public health platform is taking shape.
        </div>
      </div>
    </main>
  );
}

export default Home;
