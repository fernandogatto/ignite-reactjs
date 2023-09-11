import Image from "next/image";

import { useKeenSlider } from 'keen-slider/react';

import { HomeContainer, ProductItem } from "@/styles/pages/home";

import camiseta1 from "../assets/clothes/1.png";

import 'keen-slider/keen-slider.min.css';

export default function Home() {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48
        }
    });

    return (
        <HomeContainer ref={sliderRef} className="keen-slider">
            <ProductItem className="keen-slider__slide">
                <Image src={camiseta1} width={520} height={480} alt="1" />

                <footer>
                    <strong>Camiseta X</strong>
                    <span>R$ 79,90</span>
                </footer>
            </ProductItem>
            <ProductItem className="keen-slider__slide">
                <Image src={camiseta1} width={520} height={480} alt="1" />

                <footer>
                    <strong>Camiseta X</strong>
                    <span>R$ 79,90</span>
                </footer>
            </ProductItem>
            <ProductItem className="keen-slider__slide">
                <Image src={camiseta1} width={520} height={480} alt="1" />

                <footer>
                    <strong>Camiseta X</strong>
                    <span>R$ 79,90</span>
                </footer>
            </ProductItem>
            <ProductItem className="keen-slider__slide">
                <Image src={camiseta1} width={520} height={480} alt="1" />

                <footer>
                    <strong>Camiseta X</strong>
                    <span>R$ 79,90</span>
                </footer>
            </ProductItem>
            <ProductItem className="keen-slider__slide">
                <Image src={camiseta1} width={520} height={480} alt="1" />

                <footer>
                    <strong>Camiseta X</strong>
                    <span>R$ 79,90</span>
                </footer>
            </ProductItem>
        </HomeContainer>
    );
}