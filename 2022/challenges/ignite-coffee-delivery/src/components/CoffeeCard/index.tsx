import { CoffeeContainer } from './styles';

import { ICoffee } from '@constants/coffees'

export function CoffeeCard({
  id,
  name,
  type,
  description,
  image,
  price,
}: ICoffee) {
  return (
    <CoffeeContainer>
      <img src={image} alt={name} />

      <div className="info-container">
        <div className="tags-container">
          <div className="tag-item">
            <span>{type}</span>
          </div>
        </div>

        <h4 className="name">{name}</h4>

        <p className="description">{description}lo</p>

        <div className="buy-container">

        </div>
      </div>
    </CoffeeContainer>
  )
}
