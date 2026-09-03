import {
  SearchSuggestionType,
  type Banner,
  type Category,
  type Product,
  type SearchSuggestion,
} from '@/domain/entities'

const asset = (name: string) => `/assets/geocart/${name}`

export const geocartCategories: Category[] = [
  {
    id: 'mobile-wearables',
    title: 'Mobile & Wearables',
    imageSrc: asset('category-mobile-wearables.png'),
  },
  {
    id: 'computers-gaming',
    title: 'Computers & Gaming',
    imageSrc: asset('category-computers-gaming.png'),
  },
  {
    id: 'tv-audio-entertainment',
    title: 'TV, Audio & Entertainment',
    imageSrc: asset('category-tv-audio.png'),
  },
  {
    id: 'photo-video',
    title: 'Photo & Video',
    imageSrc: asset('category-photo-video.png'),
  },
  {
    id: 'home-kitchen',
    title: 'Home & Kitchen',
    imageSrc: asset('category-home-kitchen.png'),
  },
  {
    id: 'health-beauty',
    title: 'Health & Beauty',
    imageSrc: asset('category-health-beauty.png'),
  },
]

export const geocartBanner: Banner = {
  id: 'fitbit-air',
  kicker: 'Google Fitbit Air',
  title: 'Make every move a healthy one',
  price: 754,
  currency: '₾',
  imageSrc: asset('hero-fitbit-air.png'),
}

export const geocartProducts: Product[] = [
  {
    id: 'macbook-neo-blush',
    name: 'Apple MacBook Neo 256 GB Blush',
    price: 1752,
    currency: '₾',
    offers: 15,
    imageSrc: asset('product-macbook-neo.png'),
    isNew: true,
  },
  {
    id: 'iphone-17-blue',
    name: 'Apple iPhone 17, 256 GB Blue Dual: nano SIM + eSIM',
    price: 1951,
    currency: '₾',
    offers: 5,
    imageSrc: asset('product-iphone-17-blue.png'),
    imageFit: 'cover',
  },
  {
    id: 'watch-ultra-black',
    name: 'Apple Watch Ultra 3 49mm Black Titanium Case with Black Alpine Loop',
    price: 2140,
    currency: '₾',
    offers: 9,
    imageSrc: asset('product-watch-ultra.png'),
  },
  {
    id: 'airpods-max-midnight',
    name: 'Apple AirPods Max Midnight',
    price: 1294,
    currency: '₾',
    offers: 13,
    imageSrc: asset('product-airpods-max.png'),
    isNew: true,
    isFavorite: true,
  },
  {
    id: 'playstation-5-slim',
    name: 'Sony PlayStation 5 Slim 1TB White',
    price: 1941,
    currency: '₾',
    offers: 4,
    imageSrc: asset('product-playstation-5.png'),
  },
  {
    id: 'dreame-robot-vacuum',
    name: 'DREAME Robot Vacuum L40s Pro Ultra White',
    price: 2999,
    currency: '₾',
    offers: 3,
    imageSrc: asset('product-dreame-vacuum.png'),
  },
  {
    id: 'ardesto-washer-dryer',
    name: 'ARDESTO Washer Dryer Machine WDMW-106ISBD',
    price: 1079,
    currency: '₾',
    offers: 5,
    imageSrc: asset('product-ardesto-washer.png'),
    isNew: true,
  },
  {
    id: 'ipad-11-yellow',
    name: 'New 2025 Apple iPad 11-inch (A16) 11th Gen Wi-Fi Yellow',
    price: 1641,
    currency: '₾',
    offers: 2,
    imageSrc: asset('product-ipad-yellow.png'),
  },
  {
    id: 'melitta-ci-touch',
    name: 'Melitta Coffee Machine CI Touch Silver F630-111EU',
    price: 2759,
    currency: '₾',
    offers: 10,
    imageSrc: asset('product-melitta-coffee.png'),
  },
  {
    id: 'dreame-air-purifier',
    name: 'DREAME Air Purifier PM20',
    price: 2399,
    currency: '₾',
    offers: 4,
    imageSrc: asset('product-dreame-air-purifier.png'),
    isNew: true,
  },
  {
    id: 'iphone-17-blue-second',
    name: 'Apple iPhone 17, 256 GB Blue Dual: nano SIM + eSIM',
    price: 1951,
    currency: '₾',
    offers: 5,
    imageSrc: asset('product-iphone-17-blue-alt.png'),
    imageFit: 'cover',
  },
  {
    id: 'iphone-17-lavender',
    name: 'Apple iPhone 17 256GB Lavender Dual: nano SIM + eSIM',
    price: 2899,
    currency: '₾',
    offers: 5,
    imageSrc: asset('product-iphone-17-lavender.png'),
    imageFit: 'cover',
  },
]

export const geocartSearchSuggestions: SearchSuggestion[] = [
  {
    id: 'monitor-asus-rog-strix-white',
    label: '27" Монитор ASUS ROG Strix XG27ACS-W White',
    type: SearchSuggestionType.product,
  },
  {
    id: 'palit-geforce-rtx-white',
    label: 'Palit GeForce RTX 5060 Ti White OC [NE7506TU19P1-GB2062M]',
    type: SearchSuggestionType.product,
  },
  {
    id: 'gigabyte-b850m-aorus-ice',
    label: 'GIGABYTE B850M AORUS ELITE WIFI6E ICE',
    type: SearchSuggestionType.product,
  },
  {
    id: 'white-smartphones',
    label: 'White Smartphones',
    type: SearchSuggestionType.category,
  },
  {
    id: 'white-gaming-consoles',
    label: 'White Gaming Consoles',
    type: SearchSuggestionType.category,
  },
  {
    id: 'white-laptops',
    label: 'White Laptops',
    type: SearchSuggestionType.category,
  },
  {
    id: 'playstation-5-slim-1tb-white',
    label: 'Sony PlayStation 5 Slim 1TB White',
    type: SearchSuggestionType.product,
  },
  {
    id: 'playstation-ps5-slim-digital-white',
    label: 'Sony PlayStation PS5 Slim 825GB Digital Edition White',
    type: SearchSuggestionType.product,
  },
  {
    id: 'playstation-5-slim-1tb-white-repeat',
    label: 'Sony PlayStation 5 Slim 1TB White',
    type: SearchSuggestionType.product,
  },
  {
    id: 'playstation-games',
    label: 'PlayStation Games',
    type: SearchSuggestionType.category,
  },
  {
    id: 'playstation-gaming-consoles',
    label: 'PlayStation Gaming Consoles',
    type: SearchSuggestionType.category,
  },
  {
    id: 'playstation-accessories',
    label: 'PlayStation Accessories',
    type: SearchSuggestionType.category,
  },
]
