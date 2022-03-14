import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import Image from 'next/image'

import styles from './home.module.scss'
import { GetServerSideProps } from 'next';
import { stripe } from '../services/stripe';

// Client side
// Server side
// Static site generation

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
    <Head>
      <title>Home | ig.news</title>
    </Head>

    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get access to all publications <br />
          <span>for $9.90 month</span>
        </p>
        <SubscribeButton priceId={product.priceId}/>
      </section>

      <Image src="/images/avatar.svg" width={500} height={500} alt="Girl coding" />
    </main>
   </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const price = await stripe.prices.retrieve('price', {
  //   expand: ['product']
  // })

  const product = {
    priceId: 1,
    amount: new Intl.NumberFormat('en-US', ({
      style: 'currency',
      currency: 'USD'
    })).format(10/ 100),
  }
  return {
    props: {
      product
    }
  }
}
