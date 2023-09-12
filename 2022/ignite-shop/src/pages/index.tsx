import { GetServerSideProps } from 'next';
import Image from 'next/image';

import { stripe } from '@/lib/strpe';
import { useKeenSlider } from 'keen-slider/react';

import { HomeContainer, ProductItem } from '@/styles/pages/home';

import camiseta1 from '../assets/clothes/1.png';

import 'keen-slider/keen-slider.min.css';
import Stripe from 'stripe';

interface IProductProps {
    id: String,
    name: String,
    description: String,
    imageUrl: String,
    price: number,
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
                <ProductItem key={item.id} className="keen-slider__slide">
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={520}
                        height={480}
                    />

                    <footer>
                        <strong>{item.name}</strong>
                        <span>R$ {item.price}</span>
                    </footer>
                </ProductItem>
            ))}
        </HomeContainer>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
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
            price: price.unit_amount / 100,
        }
    })

    console.log('response', response.data)

    return {
        props: {
            products,
        }
    }
}