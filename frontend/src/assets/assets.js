// all assets used in the frontend
import OrganicVegetablesImg from './img/organic-vegetables-img.png';
import FreshFruitsImg from './img/fresh-fruits-img.png';
import SeasonedSpicesImg from './img/seasoned-spices-img.png';
import IceCreamsImg from './img/ice-creams-img.png';
import SnacksImg from './img/snacks-img.png';
import ColdDrinksImg from './img/cold-drinks-img.png';
import NutsAndSeedsImg from './img/nuts-and-seeds-img.png';
import CadburyCollectionsImg from './img/cadbury-collections-img.png';
import FastBreakFastsImg from './img/fast-breakfasts-img.png';
import PotatoImg1 from './img/potato-img1.png';
import PotatoImg2 from './img/potato-img2.png';
import PotatoImg3 from './img/potato-img3.png';
import PotatoImg4 from './img/potato-img4.png';
import AppleImg1 from './img/apple-img1.png';
import AppleImg2 from './img/apple-img2.png';
import AppleImg3 from './img/apple-img3.png';
import AppleImg4 from './img/apple-img4.png';
import TurmericPowderImg1 from './img/turmeric-powder-img1.png';
import TurmericPowderImg2 from './img/turmeric-powder-img2.png';
import TurmericPowderImg3 from './img/turmeric-powder-img3.png';
import TurmericPowderImg4 from './img/turmeric-powder-img4.png';
import AlmondsImg1 from './img/almonds-img1.png';
import AlmondsImg2 from './img/almonds-img2.png';
import AlmondsImg3 from './img/almonds-img3.png';
import AlmondsImg4 from './img/almonds-img4.png';
import LaysImg1 from './img/lays-img1.png';
import LaysImg2 from './img/lays-img2.png';
import LaysImg3 from './img/lays-img3.png';
import LaysImg4 from './img/lays-img4.png';
import NoodlesImg1 from './img/noodles-img1.png';
import NoodlesImg2 from './img/noodles-img2.png';
import NoodlesImg3 from './img/noodles-img3.png';
import NoodlesImg4 from './img/noodles-img4.png';
import DairyMilkImg1 from './img/dairy-milk-img1.png';
import DairyMilkImg2 from './img/dairy-milk-img2.png';
import DairyMilkImg3 from './img/dairy-milk-img3.png';
import DairyMilkImg4 from './img/dairy-milk-img4.png';
import MagnumImg1 from './img/magnum-img1.png';
import MagnumImg2 from './img/magnum-img2.png';
import MagnumImg3 from './img/magnum-img3.png';
import MagnumImg4 from './img/magnum-img4.png';
import CokeZeroImg1 from './img/cokezero-img1.png';
import CokeZeroImg2 from './img/cokezero-img2.png';
import CokeZeroImg3 from './img/cokezero-img3.png';
import CokeZeroImg4 from './img/cokezero-img4.png';

// all categories for the frontend
export const categories = [
    {
        text: 'Organic Vegetables',
        path: 'vegetables',
        image: OrganicVegetablesImg,
        bgColor: '#FEF6DA',
    },
    {
        text: 'Fresh Fruits',
        path: 'fruits',
        image: FreshFruitsImg,
        bgColor: '#FEE0E0',
    },
    {
        text: 'Seasoned Spices',
        path: 'spices',
        image: SeasonedSpicesImg,
        bgColor: '#f5e9ff',
    },
    {
        text: 'Nuts & Seeds',
        path: 'nuts',
        image: NutsAndSeedsImg,
        bgColor: '#f6ffd5',
    },
    {
        text: 'Snacks & Munchies',
        path: 'snacks',
        image: SnacksImg,
        bgColor: '#e0f6fe',
    },
    {
        text: 'Fast Breakfasts',
        path: 'fastbreakfasts',
        image: FastBreakFastsImg,
        bgColor: '#fff4c9', 
    },
    {
        text: 'Dairy & Chocolates',
        path: 'dairynchocolates',
        image: CadburyCollectionsImg,
        bgColor: '#FEE0E0',
    },
    {
        text: 'Ice Creams',
        path: 'icecreams',
        image: IceCreamsImg,
        bgColor: '#dcffd9',
    },
    {
        text: 'Cold Drinks',
        path: 'drinks',
        image: ColdDrinksImg,
        bgColor: '#f5f5f5',
    },
];

// all footer links for the frontend
export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "#" },
      { text: "Offers & Deals", url: "#" },
      { text: "About Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

// all products for the frontend
export const dummyproducts = [

    //Vegetables
    {
       _id: 'gd46g23h',
       name: 'Potato 1Kg',
       category: 'vegetables',
       price: 25,
       offerPrice: 20,
       image: [PotatoImg1, PotatoImg2, PotatoImg3, PotatoImg4],
       description: [
            'Fresh and organic',
            'Rich in carbohydrates',
            'Ideal for curries and fries',
        ],
        createdAt: '2025-03-25T07:17:46.018Z',
        updatedAt: '2025-03-25T07:18:13.103Z',
        inStock: true,
    },

    // Fruits
    {
       _id: 'gd46g23i',
       name: 'Apple 1Kg',
       category: 'fruits',
       price: 80,
       offerPrice: 75,
       image: [AppleImg1, AppleImg2, AppleImg3, AppleImg4],
       description: [
            'Fresh and sweet',
            'Rich in vitamins',
            'Ideal for juices and salads',
        ],
        createdAt: '2025-03-25T07:17:46.018Z',
        updatedAt: '2025-03-25T07:18:13.103Z',
        inStock: true,
    },

    // Spices
    {
       _id: 'gd46g23j',
       name: 'Turmeric Powder 100g',
       category: 'spices',
       price: 20,
       offerPrice: 15,
       image: [TurmericPowderImg1, TurmericPowderImg2, TurmericPowderImg3, TurmericPowderImg4],
       description: [
            'Pure and organic',
            'Rich in antioxidants',
            'Ideal for cooking and health',
        ],
        createdAt: '2025-03-25T07:17:46.018Z',
        updatedAt: '2025-03-25T07:18:13.103Z',
        inStock: true,
    },

    // Nuts & Seeds
    {
       _id: 'gd46g23k',
       name: 'Almonds 250g',
       category: 'nuts',
       price: 60,
       offerPrice: 50,
       image: [AlmondsImg1, AlmondsImg2, AlmondsImg3, AlmondsImg4],
       description: [
            'Crunchy and healthy',
            'Rich in healthy fats',
            'Ideal for snacking and baking',
        ],
        createdAt: '2025-03-25T07:17:46.018Z',
        updatedAt: '2025-03-25T07:18:13.103Z',
        inStock: true,
    },

    // Snacks & Munchies
    {
       _id: 'gd46g23l',
       name: 'Lays Party Pack Combo',
       category: 'snacks',
       price: 70,
       offerPrice: 65,
       image: [LaysImg1, LaysImg2, LaysImg3, LaysImg4],
       description: [
            'Crispy and delicious',
            'Rich in flavor',
            'Ideal for snacking and parties',
        ],
        createdAt: '2025-03-25T07:17:46.018Z',
        updatedAt: '2025-03-25T07:18:13.103Z',
        inStock: true,
    },

    // Fast Breakfasts
    {
       _id: 'gd46g23m',
       name: 'Noodles Combo Pack',
       category: 'fastbreakfasts',
       price: 17,
       offerPrice: 10,
       image: [NoodlesImg1, NoodlesImg2, NoodlesImg3, NoodlesImg4],
       description: [
            'Quick and easy to prepare',
            'Rich in flavor',
            'Ideal for breakfast and snacks',
        ],
        createdAt: '2025-03-25T07:17:46.018Z',
        updatedAt: '2025-03-25T07:18:13.103Z',
        inStock: true,
    },

    // Dairy & Chocolates
    {
       _id: 'gd46g23n',
       name: 'Cadbury Dairy Milk 100g',
       category: 'dairynchocolates',
       price: 50,
       offerPrice: 40,
       image: [DairyMilkImg1, DairyMilkImg2, DairyMilkImg3, DairyMilkImg4],
       description: [
            'Smooth and creamy chocolate',
            'Rich in chocolate',
            'Ideal for snacking and gifting',
        ],
        createdAt: '2025-03-25T07:17:46.018Z',
        updatedAt: '2025-03-25T07:18:13.103Z',
        inStock: true,
    },

    // Ice Creams
    {
       _id: 'gd46g23o',
       name: 'Magnum Ice Cream',
       category: 'icecreams',
       price: 120,
       offerPrice: 90,
       image: [MagnumImg1, MagnumImg2, MagnumImg3, MagnumImg4],
       description: [
            'Creamy and delicious ice cream',
            'Rich in flavor',
            'Ideal for desserts and parties',
        ],
        createdAt: '2025-03-25T07:17:46.018Z',
        updatedAt: '2025-03-25T07:18:13.103Z',
        inStock: true,
    },

    // Cold Drinks
    {
       _id: 'gd46g23p',
       name: 'Coke Zero 350ml',
       category: 'drinks',
       price: 20,
       offerPrice: 15,
       image: [CokeZeroImg1, CokeZeroImg2, CokeZeroImg3, CokeZeroImg4],
       description: [
            'Refreshing and fizzy drink',
            'Rich in flavor',
            'Ideal for parties and gatherings',
        ],
        createdAt: '2025-03-25T07:17:46.018Z',
        updatedAt: '2025-03-25T07:18:13.103Z',
        inStock: true,
    },

];

export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Test",
    lastName: "User",
    email: "user.test@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

export const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyproducts[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyproducts[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: dummyproducts[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:17:13.068Z",
  },
];