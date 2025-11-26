
const ALL_PRODUCTS = [
  {
    id: 128,
    name: "Samsung Galaxy S25 Ultra - Titanium Gray",
    imageUrl: "https://www.iphone-droid.net/spec/wp-content/uploads/2025/01/Samsung-Galaxy-S25-Ultra-Titanium-Gray.jpg",
    price: 52900,
    rating: "⭐️⭐️⭐️⭐️☆ (30)",
    category: "smartphone",
    desc: "The Samsung Galaxy S25 Ultra features a stunning display, powerful performance, and an advanced camera system to capture every moment in incredible detail."
  },
 
  {
    id: 129,
    status: 1,  //1= best seller
    name: "Apple iPhone 17 Pro Max 256GB Cosmic Orange",
    imageUrl: "https://media-cdn.bnn.in.th/533314/iPhone_17_Pro_Max_01.jpg",
    price: 54500,
    rating: "⭐️⭐️⭐️⭐️☆ (180)",
    category: "smartphone",
    desc: "The iPhone 17 Pro Max offers a sleek design, powerful A17 Bionic chip, and a Pro camera system that takes photography to the next level."
  },
  
  {
    id: 130,
    name: "Apple iPad Pro 11-inch Wi-Fi 256GB",
    imageUrl: "https://media-cdn.bnn.in.th/395474/iPad-Pro-11-inch-M4-Wi-Fi-SpaceBlack-2-square_medium.jpg",
    price: 34900,
    rating: "⭐️⭐️⭐️⭐️ (77)",
    category: "smartphone",
    desc: "The iPad Pro 11-inch offers a powerful M4 chip, a stunning Liquid Retina display, and versatile features for both work and play."
  },

  
  {
    id: 101,
    status: 1,
    name: "Apple AirPods Max",
    imageUrl: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/og-airpods-max-202409?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1724144125817",
    price: 15900,
    rating: "⭐️⭐️⭐️⭐️⭐️ (150)",
    category: "it-gadget",
    desc: "Apple AirPods Max delivers high-fidelity audio, active noise cancellation, and a comfortable over-ear design for an immersive listening experience."
  },
  
  {
    id: 112,
    status: 1,
    name: "Keychron K3 Pro Mechanical",
    imageUrl: "https://media-cdn.bnn.in.th/364611/keychron-gaming-keyboard-k3-pro-00-square_medium.jpg",
    price: 3990,
    rating: "⭐️⭐️⭐️⭐️⭐️ (210)",
    category: "it-gadget",
    desc: "The Keychron K3 Pro Mechanical keyboard offers a compact design, hot-swappable switches, and RGB lighting for a customizable typing experience."
  },
  
  {
    id: 120,
    name: "Monitor 24 DELL S2421HN",
    imageUrl: "https://img.advice.co.th/images_nas/pic_product4/A0133430/A0133430OK_BIG_1.jpg",
    price: 2990,
    rating: "⭐️⭐️⭐️⭐️☆ (95)",
    category: "it-gadget",
    desc: "The DELL S2421HN monitor features a 24-inch Full HD display, sleek design, and vibrant colors for an enhanced viewing experience."
  },
  
  {
    id: 105,
    name: "Samsung Galaxy Watch5 - 44mm",
    imageUrl: "https://media-cdn.bnn.in.th/389590/Samsung-Galaxy-Watch5-44mm-BT-Silver---6-square_medium.jpg",
    price: 3590,
    rating: "⭐️⭐️⭐️⭐️☆ (89)",
    category: "smartwatch",
    desc: "The Samsung Galaxy Watch5 offers advanced health tracking, a sleek design, and seamless integration with your smartphone."
  },
  
  {
    id: 122,
    status: 1,
    name: "Apple Watch Series 10 GPS 46mm Silver",
    imageUrl: "https://media-cdn.bnn.in.th/428274/Apple_Watch_Series_10_46mm_GPS_Silver_Aluminum_Sport_Band_Denim_1-square_medium.jpg",
    price: 15500,
    rating: "⭐️⭐️⭐️⭐️ (102)",
    category: "smartwatch",
    desc: "The Apple Watch Series 10 features a larger display, advanced health sensors, and improved performance for a better smartwatch experience."
  },

  {
    id: 123,
    status: 1,
    name: "Nike Men's Air Max 95 Shoes",
    imageUrl: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/eae31d63-1a01-4419-acf2-10061073f5ff/%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B8%A7-nike-sb-air-max-95-x-eric-koston-obsidian-and-speed-yellow-hq8492-400.jpg",
    price: 6600,
    rating: "⭐️⭐️⭐️⭐️⭐️ (330)",
    category: "sport",
    desc: "Nike Men's Air Max 95 Shoes offer a stylish design, comfortable fit, and excellent cushioning for all-day wear."
  },

  // หมวดหมู่: 'accessories' (pricetag-outline)
  {
    id: 115,
    status: 1,
    name: "BELKIN BOOSTCHARGE 10K",
    imageUrl: "https://www.jbhifi.com.au/cdn/shop/files/831357-Product-2-I-638962450802111269.jpg?v=1760648346",
    price: 2260,
    rating: "⭐️⭐️⭐️⭐️☆ (112)",
    category: "accessories",
    desc: "BELKIN BOOSTCHARGE 10K offers fast and reliable wireless charging with a sleek design and compact size."
  },

  {
    id: 121,
    name: "ARCHER Office Chair - Grey",
    imageUrl: "https://www.indexlivingmall.com/_next/image?url=https%3A%2F%2Fmedia.indexlivingmall.com%2Fmedia%2Fcatalog%2Fproduct%2F1%2F1%2F110045637_1729564942096jGji.jpg&w=1920&q=75",
    price: 2390,
    rating: "⭐️⭐️⭐️☆ (55)",
    category: "accessories",
    desc: "The ARCHER Office Chair in Grey offers ergonomic support and modern design for comfortable seating."
  },
  
  {
    id: 126,
    name: "New Tiny Orb Pendant Necklace",
    imageUrl: "https://www.viviennewestwood.com/dw/image/v2/BJGV_PRD/on/demandware.static/-/Sites-viviennewestwood-master-catalog/default/dwc9da4682/images/63020097-02P755-_PLATINUM-BLACK-CZ-JET-Crystal_001_large.jpg?sw=1140&sh=1516&sm=fit&q=80",
    price: 8000,
    rating: "⭐️⭐️⭐️⭐️☆ (99)",
    category: "accessories",
    desc: "New Tiny Orb Pendant Necklace features a delicate design with a platinum finish and black CZ jet crystal for a sophisticated look."
  },
  
  {
    id: 127,
    name: "SAINT LAURENT Paris East/West wallet",
    imageUrl: "https://saint-laurent.dam.kering.com/m/67436d89260b77f6/Medium2-3963070U90N1000_A.jpg?v=6",
    price: 15750,
    rating: "⭐️⭐️⭐️⭐️ (150)",
    category: "accessories",
    desc: "SAINT LAURENT Paris East/West wallet offers a luxurious design with premium materials for a stylish and functional accessory."
  },

  {
    id: 124,
    name: "ADIDAS Adizero Running Jacket",
    imageUrl: "https://www.supersports.co.th/cdn/shop/files/AD001AP831ERTH-0.jpg?v=1761034052&width=900",
    price: 2800,
    rating: "⭐️⭐️⭐️☆ (40)",
    category: ["clothing", "sport"],
    desc: "ADIDAS Adizero Running Jacket offers lightweight performance and stylish design for runners and athletes."
  },
  
  {
    id: 125,
    name: "CELINE LOOSE T-SHIRT",
    imageUrl: "https://image.celine.com/1302276dfc4a47a2/original/2X764671Q-38AW_1_WIN21_W.jpg?im=Resize=(1200);AspectCrop=(1,1),xPosition=.5,yPosition=.5",
    price: 21000,
    rating: "⭐️⭐️⭐️⭐️ (120)",
    category: "clothing",
    desc: "CELINE LOOSE T-SHIRT offers a comfortable fit and timeless style for everyday wear."
  }
];