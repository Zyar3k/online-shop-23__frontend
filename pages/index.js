import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import Layout from "@/components/Layout";
import Products from "@/components/Products";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Layout>
        <main className={styles.main}>
          <Products />
        </main>
      </Layout>
    </>
  );
}
