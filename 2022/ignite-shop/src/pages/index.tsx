import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { stripe } from '@/lib/strpe';
import { useKeenSlider } from 'keen-slider/react';

import { HomeContainer, ProductItem } from '@/styles/pages/home';

import 'keen-slider/keen-slider.min.css';
import Stripe from 'stripe';

interface IProductProps {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    price: string,
}

interface IHomeProps {
    products: Array<IProductProps>
}

export default function Home({ products }: IHomeProps) {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48
        }
    });

    return (
        <HomeContainer ref={sliderRef} className="keen-slider">
            {products.map(item => (
                <Link href={`/product/${item.id}`} key={item.id}>
                    <ProductItem className="keen-slider__slide">
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={520}
                            height={480}
                            blurDataURL="data:image/jpeg..."
                            placeholder="blur"
                        />

                        <footer>
                            <strong>{item.name}</strong>
                            <span>{item.price}</span>
                        </footer>
                    </ProductItem>
                </Link>
            ))}
        </HomeContainer>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
    });

    const products = response.data.map(item => {
        const price = item.default_price as Stripe.Price;

        return {
            id: item.id,
            name: item.name,
            description: item.description,
            imageUrl: item.images[0],
            price: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(Number(price.unit_amount) / 100),
        }
    })

    return {
        props: {
            products,
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}