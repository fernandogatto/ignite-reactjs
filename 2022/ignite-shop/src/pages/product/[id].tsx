import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router'

import { stripe } from '@/lib/strpe';
import Stripe from 'stripe';

import {
    ImageContainer,
    ProductContainer,
    ProductDetailsContainer,
} from '@/styles/pages/product';

interface IProductProps {
    product: {
        id: string,
        name: string,
        description: string,
        imageUrl: string,
        price: string,
    }
}

export default function Product({ product }: IProductProps) {
    return (
        <ProductContainer>
            <ImageContainer>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={520}
                    height={480}
                />
            </ImageContainer>

            <ProductDetailsContainer>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>

                <button>
                    Comprar agora
                </button>
            </ProductDetailsContainer>
        </ProductContainer>
    );
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: []
    }
}

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async ({ params }: any) => {
    const id = params.id;

    const product = await stripe.products.retrieve(id, {
        expand: ['default_price'],
    });

    const price = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(Number(price.unit_amount) / 100),
            },
        },
        // revalidate: 60 * 60 * 1, // 1 hour
    }
}