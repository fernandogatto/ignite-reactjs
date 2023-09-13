import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
        defaultPriceId: string,
    }
}

export default function Product({ product }: IProductProps) {
    const { isFallback } = useRouter();

    if (isFallback) {
        return (
            <p>Loading...</p>
        );
    }

    function handleBuyButton() {
        console.log('defaultPriceId', product.defaultPriceId);
    }

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

                <button onClick={handleBuyButton}>
                    Comprar agora
                </button>
            </ProductDetailsContainer>
        </ProductContainer>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Buscar os produtos mais acessados

    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }: any) => {
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
                defaultPriceId: price.id,
            },
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}