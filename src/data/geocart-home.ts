import {
  SearchSuggestionType,
  type Banner,
  type Category,
  type Product,
  type SearchSuggestion,
} from "@/domain/entities";

const asset = (name: string) => `/assets/geocart/${name}`;

export const geocartCategoryTree: Category[] = [
  {
    id: "mobile-wearables",
    title: "Mobile & Wearables",
    imageSrc: asset("category-mobile-wearables.png"),
    subCategories: [
      {
        id: "mobile-phones",
        title: "Mobile Phones",
        imageSrc: "",
        subCategories: [
          {
            id: "all-smartphones",
            title: "All Smartphones",
            imageSrc: "",
          },
          {
            id: "apple-mobile-phones",
            title: "Apple",
            imageSrc: "",
          },
          {
            id: "samsung-mobile-phones",
            title: "Samsung",
            imageSrc: "",
          },
          {
            id: "xiaomi-mobile-phones",
            title: "Xiaomi",
            imageSrc: "",
          },
          {
            id: "push-button-phones",
            title: "Push-button phones",
            imageSrc: "",
          },
        ],
      },
      {
        id: "apple",
        title: "Apple",
        imageSrc: "",
        subCategories: [
          {
            id: "iphone-17-pro",
            type: "button",
            title: "iPhone 17 Pro",
            imageSrc: "",
          },
          {
            id: "iphone-17-pro-max",
            type: "button",
            title: "iPhone  17 Pro Max",
            imageSrc: "",
          },
          {
            id: "iphone-air",
            type: "button",
            title: "iPhone Air",
            imageSrc: "",
          },
          {
            id: "iphone-17",
            type: "button",
            title: "iPhone 17",
            imageSrc: "",
          },
          {
            id: "iphone-17e",
            type: "button",
            title: "iPhone 17e",
            imageSrc: "",
          },
          {
            id: "apple-iphone",
            title: "Apple iPhone",
            imageSrc: "",
          },
          {
            id: "apple-watch",
            title: "Apple Watch",
            imageSrc: "",
          },
          {
            id: "airpods",
            title: "AirPods",
            imageSrc: "",
          },
        ],
      },
      {
        id: "samsung",
        title: "Samsung",
        imageSrc: "",
        subCategories: [
          {
            id: "galaxy-s26",
            type: "button",
            title: "Galaxy S26",
            imageSrc: "",
          },
          {
            id: "galaxy-s26-plus",
            type: "button",
            title: "Galaxy S26+",
            imageSrc: "",
          },
          {
            id: "galaxy-s26-ultra",
            type: "button",
            title: "Galaxy S26 Ultra",
            imageSrc: "",
          },
          {
            id: "galaxy-z-fold8",
            type: "button",
            title: "Galaxy Z Fold8",
            imageSrc: "",
          },
          {
            id: "galaxy-z-flip8",
            type: "button",
            title: "Galaxy Z Flip8",
            imageSrc: "",
          },
          {
            id: "galaxy-a57",
            type: "button",
            title: "Galaxy A57",
            imageSrc: "",
          },
          {
            id: "samsung-smartphones",
            title: "Samsung Smartphones",
            imageSrc: "",
          },
          {
            id: "galaxy-watch",
            title: "Galaxy Watch",
            imageSrc: "",
          },
          {
            id: "galaxy-buds",
            title: "Galaxy Buds",
            imageSrc: "",
          },
        ],
      },
      {
        id: "waarables",
        title: "Waarables",
        imageSrc: "",
        subCategories: [
          {
            id: "smart-watches-fitness-trackers",
            title: "Smart Watches and Fitness Trackers",
            imageSrc: "",
          },
          {
            id: "smart-rings",
            title: "Smart Rings",
            imageSrc: "",
          },
          {
            id: "headphones",
            title: "Headphones",
            imageSrc: "",
          },
          {
            id: "headsets",
            title: "Headsets",
            imageSrc: "",
          },
          {
            id: "portable-audio",
            title: "Portable Audio",
            imageSrc: "",
          },
          {
            id: "vr-headsets",
            title: "VR Headsets",
            imageSrc: "",
          },
          {
            id: "wearables-other",
            title: "Other",
            imageSrc: "",
          },
        ],
      },
      {
        id: "phone-accessories",
        title: "Phone Accessories",
        imageSrc: "",
        subCategories: [
          {
            id: "cases",
            title: "Cases",
            imageSrc: "",
          },
          {
            id: "screen-protectors",
            title: "Screen Protectors",
            imageSrc: "",
          },
          {
            id: "chargers",
            title: "Chargers",
            imageSrc: "",
          },
          {
            id: "cables",
            title: "Cables",
            imageSrc: "",
          },
          {
            id: "memory-cards",
            title: "Memory Cards",
            imageSrc: "",
          },
          {
            id: "power-banks",
            title: "Power Banks",
            imageSrc: "",
          },
          {
            id: "phone-accessories-other",
            title: "Other",
            imageSrc: "",
          },
        ],
      },
    ],
  },
  {
    id: "computers-gaming",
    title: "Computers & Gaming",
    imageSrc: asset("category-computers-gaming.png"),
  },
  {
    id: "tv-audio-entertainment",
    title: "TV, Audio & Entertainment",
    imageSrc: asset("category-tv-audio.png"),
  },
  {
    id: "photo-video",
    title: "Photo & Video",
    imageSrc: asset("category-photo-video.png"),
  },
  {
    id: "home-kitchen",
    title: "Home & Kitchen",
    imageSrc: asset("category-home-kitchen.png"),
  },
  {
    id: "health-beauty",
    title: "Health & Beauty",
    imageSrc: asset("category-health-beauty.png"),
  },
];

export const geocartCategories: Category[] = geocartCategoryTree.map(
  (category) => ({
    id: category.id,
    type: category.type,
    title: category.title,
    imageSrc: category.imageSrc,
  }),
);

export const geocartBanner: Banner = {
  id: "fitbit-air",
  kicker: "Google Fitbit Air",
  title: "Make every move a healthy one",
  price: 754,
  currency: "₾",
  imageSrc: asset("hero-fitbit-air.png"),
};

const productCategories = {
  coffeeMachines: {
    id: "coffee-machines",
    title: "Coffee Machines",
  },
  gamingConsoles: {
    id: "gaming-consoles",
    title: "Gaming Consoles",
  },
  headphones: {
    id: "headphones",
    title: "Headphones",
  },
  laptops: {
    id: "laptops",
    title: "Laptops",
  },
  mobilePhones: {
    id: "mobile-phones",
    title: "Mobile Phones",
  },
  smartWatches: {
    id: "smart-watches",
    title: "Smart Watches",
  },
  tablets: {
    id: "tablets",
    title: "Tablets",
  },
  vacuumCleaners: {
    id: "vacuum-cleaners",
    title: "Vacuum Cleaners",
  },
  washersDryers: {
    id: "washers-dryers",
    title: "Washers & Dryers",
  },
} satisfies Record<string, NonNullable<Product["category"]>>;

export const geocartProducts: Product[] = [
  {
    id: "macbook-neo-blush",
    name: "Apple MacBook Neo 256 GB Blush",
    price: 1752,
    currency: "₾",
    offers: 15,
    imageSrc: asset("product-macbook-neo.png"),
    category: productCategories.laptops,
    isNew: true,
  },
  {
    id: "iphone-17-blue",
    name: "Apple iPhone 17, 256 GB Blue Dual: nano SIM + eSIM",
    price: 1951,
    currency: "₾",
    offers: 5,
    imageSrc: asset("product-iphone-17-blue.png"),
    category: productCategories.mobilePhones,
    imageFit: "cover",
  },
  {
    id: "watch-ultra-black",
    name: "Apple Watch Ultra 3 49mm Black Titanium Case with Black Alpine Loop",
    price: 2140,
    currency: "₾",
    offers: 9,
    imageSrc: asset("product-watch-ultra.png"),
    category: productCategories.smartWatches,
  },
  {
    id: "airpods-max-midnight",
    name: "Apple AirPods Max Midnight",
    price: 1294,
    currency: "₾",
    offers: 13,
    imageSrc: asset("product-airpods-max.png"),
    category: productCategories.headphones,
    isNew: true,
  },
  {
    id: "playstation-5-slim",
    name: "Sony PlayStation 5 Slim 1TB White",
    price: 1941,
    currency: "₾",
    offers: 4,
    imageSrc: asset("product-playstation-5.png"),
    category: productCategories.gamingConsoles,
  },
  {
    id: "dreame-robot-vacuum",
    name: "DREAME Robot Vacuum L40s Pro Ultra White",
    price: 2999,
    currency: "₾",
    offers: 3,
    imageSrc: asset("product-dreame-vacuum.png"),
    category: productCategories.vacuumCleaners,
  },
  {
    id: "ardesto-washer-dryer",
    name: "ARDESTO Washer Dryer Machine WDMW-106ISBD",
    price: 1079,
    currency: "₾",
    offers: 5,
    imageSrc: asset("product-ardesto-washer.png"),
    category: productCategories.washersDryers,
    isNew: true,
  },
  {
    id: "ipad-11-yellow",
    name: "New 2025 Apple iPad 11-inch (A16) 11th Gen Wi-Fi Yellow",
    price: 1641,
    currency: "₾",
    offers: 2,
    imageSrc: asset("product-ipad-yellow.png"),
    category: productCategories.tablets,
  },
  {
    id: "melitta-ci-touch",
    name: "Melitta Coffee Machine CI Touch Silver F630-111EU",
    price: 2759,
    currency: "₾",
    offers: 10,
    imageSrc: asset("product-melitta-coffee.png"),
    category: productCategories.coffeeMachines,
  },
  {
    id: "dreame-air-purifier",
    name: "DREAME Air Purifier PM20",
    price: 2399,
    currency: "₾",
    offers: 4,
    imageSrc: asset("product-dreame-air-purifier.png"),
    category: productCategories.vacuumCleaners,
    isNew: true,
  },
  {
    id: "iphone-17-blue-second",
    name: "Apple iPhone 17, 256 GB Blue Dual: nano SIM + eSIM",
    price: 1951,
    currency: "₾",
    offers: 5,
    imageSrc: asset("product-iphone-17-blue-alt.png"),
    category: productCategories.mobilePhones,
    imageFit: "cover",
  },
  {
    id: "iphone-17-lavender",
    name: "Apple iPhone 17 256GB Lavender Dual: nano SIM + eSIM",
    price: 2899,
    currency: "₾",
    offers: 5,
    imageSrc: asset("product-iphone-17-lavender.png"),
    category: productCategories.mobilePhones,
    imageFit: "cover",
  },
];

export const geocartSearchSuggestions: SearchSuggestion[] = [
  {
    id: "monitor-asus-rog-strix-white",
    label: '27" Монитор ASUS ROG Strix XG27ACS-W White',
    type: SearchSuggestionType.product,
  },
  {
    id: "palit-geforce-rtx-white",
    label: "Palit GeForce RTX 5060 Ti White OC [NE7506TU19P1-GB2062M]",
    type: SearchSuggestionType.product,
  },
  {
    id: "gigabyte-b850m-aorus-ice",
    label: "GIGABYTE B850M AORUS ELITE WIFI6E ICE",
    type: SearchSuggestionType.product,
  },
  {
    id: "white-smartphones",
    label: "White Smartphones",
    type: SearchSuggestionType.category,
  },
  {
    id: "white-gaming-consoles",
    label: "White Gaming Consoles",
    type: SearchSuggestionType.category,
  },
  {
    id: "white-laptops",
    label: "White Laptops",
    type: SearchSuggestionType.category,
  },
  {
    id: "playstation-5-slim-1tb-white",
    label: "Sony PlayStation 5 Slim 1TB White",
    type: SearchSuggestionType.product,
  },
  {
    id: "playstation-ps5-slim-digital-white",
    label: "Sony PlayStation PS5 Slim 825GB Digital Edition White",
    type: SearchSuggestionType.product,
  },
  {
    id: "playstation-5-slim-1tb-white-repeat",
    label: "Sony PlayStation 5 Slim 1TB White",
    type: SearchSuggestionType.product,
  },
  {
    id: "playstation-games",
    label: "PlayStation Games",
    type: SearchSuggestionType.category,
  },
  {
    id: "playstation-gaming-consoles",
    label: "PlayStation Gaming Consoles",
    type: SearchSuggestionType.category,
  },
  {
    id: "playstation-accessories",
    label: "PlayStation Accessories",
    type: SearchSuggestionType.category,
  },
];
