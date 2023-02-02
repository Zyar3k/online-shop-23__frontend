import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import Products from "@/components/Products";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Products />
      </main>
    </>
  );
}
