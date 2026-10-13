import { useMemo, useRef, useState } from "react";
import AdminLogin from "./AdminLogin.jsx";
import { motion, useReducedMotion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Eye,
  Plus,
  Minus,
} from "lucide-react";
import madhuSahasraLogo from "./assets/madhu-sahasra-logo.jpeg";
import goldBraceletImage from "./assets/gold-bracelet.png";
import goldNecklaceImage from "./assets/gold-necklace.png";
import goldRingsImage from "./assets/gold-rings.png";
import longLakshmiHaramImage from "./assets/long-lakshmi-haram.png";
import goldenBloomHalfSareeImage from "./assets/golden-bloom-half-saree.jpg";
import ourStoryWomanImage from "./assets/our-story-woman.png";
import pearlChokerImage from "./assets/pearl-choker-necklace.png";
import pearlDropEarringsImage from "./assets/pearl-drop-earrings.png";
import rubyJhumkaImage from "./assets/ruby-jhumka-earrings.png";
import sculptedGoldBraceletImage from "./assets/sculpted-gold-bracelet.png";
import shortNecklaceImage from "./assets/short-necklace.png";
import statementVaddanamImage from "./assets/statement-vaddanam.png";
import traditionalGoldBanglesImage from "./assets/traditional-gold-bangles.png";
import longFrockFloral from "./assets/long-frock-floral-01.jpg";
import punjabiPatiala from "./assets/punjabi-patiala-01.jpg";
import punjabiPrinted from "./assets/punjabi-printed-02.jpg";
import shortKurtiCotton from "./assets/short-kurti-cotton-01.jpg";
import cropTopCasual from "./assets/crop-top-casual-02.jpg";
import chudidarClassic from "./assets/chudidar-classic-01.jpg";
import chudidarEmbroidered from "./assets/chudidar-embroidered-02.jpg";
import "./index.css";
const sareeHeroImage = ourStoryWomanImage;
const products = [
  {
    id: 1, name: "Royal Kanchipuram Pattu", category: "Sarees",
    type: "Kanchipuram Silk", material: "Pure silk", color: "Rani pink & gold",
    price: 12999, tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2, name: "Royal Blue Pattu Saree", category: "Sarees",
    type: "Pattu Silk", material: "Silk", color: "Royal blue & copper",
    price: 8999, tag: "Traditional",
    image: "https://priyangaa.in/cdn/shop/files/jpeg-optimizer_783a.jpg?v=1746872846&width=1080",
  },
  {
    id: 3, name: "Banarasi Wedding Silk", category: "Sarees",
    type: "Banarasi Silk", material: "Silk blend", color: "Maroon & gold",
    price: 7499, tag: "Wedding edit",
    image: "https://www.pure-elegance.com/cdn/shop/products/90N462-_275-UntitledSession31057_1024x.jpg?v=1658508455",
  },
  {
    id: 4, name: "Champagne Tissue Saree", category: "Sarees",
    type: "Tissue Saree", material: "Tissue silk", color: "Champagne gold",
    price: 5299, tag: "New arrival",
    image: "https://gaurisaree.com/cdn/shop/files/DSC04128.jpg?v=1737051605&width=1445",
  },
  {
    id: 5, name: "Blush Organza Saree", category: "Sarees",
    type: "Organza", material: "Organza", color: "Blush pink",
    price: 4299, tag: "Lightweight",
    image: "https://www.kollybollyethnics.com/image/catalog/data/07Oct2022/Silk-Saree-with-blouse-in-Yellow-colour-14003.jpg",
  },
  {
    id: 6, name: "Emerald Soft Silk", category: "Sarees",
    type: "Soft Silk", material: "Soft silk", color: "Emerald green",
    price: 6499, tag: "Elegant",
    image: "https://pmtextile.net/images/category-reniyal.jpg",
  },
  {
    id: 7, name: "Everyday Cotton Classic", category: "Sarees",
    type: "Cotton Saree", material: "Cotton", color: "Ivory & rust",
    price: 1899, tag: "Daily wear",
    image: "https://www.sundaari.com/cdn/shop/files/SundariDesign2ndsession0052.jpg?v=1724262825",
  },
  {
    id: 8, name: "Linen Summer Drape", category: "Sarees",
    type: "Linen Saree", material: "Linen blend", color: "Sand beige",
    price: 2399, tag: "Minimal",
    image: "https://pochampallysarees.com/cdn/shop/files/UppadaSilkGreenPinkSari.jpg?v=1765173538",
  },
  {
    id: 9, name: "Georgette Party Saree", category: "Sarees",
    type: "Georgette", material: "Georgette", color: "Wine red",
    price: 3199, tag: "Party wear",
    image: "https://ethnicboutique.in/cdn/shop/files/RKS_7155.webp?v=1773654342&width=1400",
  },
  {
    id: 10, name: "Chiffon Grace Saree", category: "Sarees",
    type: "Chiffon", material: "Chiffon", color: "Powder blue",
    price: 2799, tag: "Soft drape",
    image: "https://rmkv.com/cdn/shop/files/RMKV_22-08-24_Shot12219_.1_1370x.jpg?v=1728217001",
  },
  // New half saree collection
  {
    id: 27, name: "Royal Red Kalamkari Half Saree", category: "Half Sarees",
    type: "Printed Half Saree", material: "Chanderi silk blend", color: "Maroon & mustard",
    price: 3499, tag: "New arrival",
    image: "https://anayadesignerstudio.com/cdn/shop/files/Yellow-Traditional-Half-Saree-Online-Shopping-2022.jpg?v=1714612332&width=1100",
  },
  {
    id: 28, name: "Maroon Zari Festive Half Saree", category: "Half Sarees",
    type: "Festive Half Saree", material: "Silk blend", color: "Maroon & gold",
    price: 5299, tag: "Festive pick",
    image: "https://thebeautyqueen.in/cdn/shop/files/6325713437001977756.jpg?v=1780484905&width=1920",
  },
  {
    id: 29, name: "Premium Pattu Half Saree", category: "Half Sarees",
    type: "Ready-to-Wear Half Saree", material: "Pattu silk", color: "Traditional festive mix",
    price: 8899, tag: "Premium",
    image: "https://i.pinimg.com/736x/67/41/29/67412923dbf13546cf64ebfbdaba5ced.jpg",
  },
  {
    id: 30, name: "Pink Pearl-Drape Half Saree", category: "Half Sarees",
    type: "Party Half Saree", material: "Satin blend", color: "White & pink",
    price: 3999, tag: "Party wear",
    image: "https://i.pinimg.com/736x/77/24/d4/7724d4bb01ae7caac08eb2a18ce2537d.jpg",
  },
{
    id: 12, name: "Golden Bloom Half Saree", category: "Half Sarees",
    type: "Designer Half Saree", material: "Silk blend", color: "Yellow & pink",
    price: 8999, tag: "New arrival",
    image: "https://janviaika.in/cdn/shop/files/GoldenBloomHalfSaree03.jpg?v=1769076045&width=864",
  },
  {
    id: 14, name: "Pastel Party Half Saree", category: "Half Sarees",
    type: "Party Half Saree", material: "Silk blend", color: "Pastel pink",
    price: 6999, tag: "Party wear",
    image: "https://i.pinimg.com/736x/c6/7e/e7/c67ee7a4964a61de7fe34bca6ea6c5e8.jpg",
  },
// DRESSES COLLECTION - preserved local dress images
  {
    id: 37,
    name: "Classic Chudidar Set",
    category: "Dresses",
    type: "Chudidars",
    material: "Cotton Blend",
    color: "Blue",
    price: 1799,
    tag: "Traditional",
    image: chudidarClassic,
  },
  {
    id: 38,
    name: "Embroidered Chudidar",
    category: "Dresses",
    type: "Chudidars",
    material: "Silk Blend",
    color: "Pink",
    price: 2499,
    tag: "Elegant",
    image: chudidarEmbroidered,
  },
  {
    id: 40,
    name: "Punjabi Patiala Suit",
    category: "Dresses",
    type: "Punjabi Suits",
    material: "Cotton Blend",
    color: "Green",
    price: 1899,
    tag: "Traditional",
    image: punjabiPatiala,
  },
  {
    id: 41,
    name: "Printed Punjabi Suit",
    category: "Dresses",
    type: "Punjabi Suits",
    material: "Rayon",
    color: "Pink",
    price: 1599,
    tag: "Everyday",
    image: punjabiPrinted,
  },
  {
    id: 42,
    name: "Casual Crop Top",
    category: "Dresses",
    type: "Crop Tops",
    material: "Rayon",
    color: "Black",
    price: 699,
    tag: "Casual",
    image: cropTopCasual,
  },
  {
    id: 46,
    name: "Floral Long Frock",
    category: "Dresses",
    type: "Long Frocks",
    material: "Georgette",
    color: "Floral Pink",
    price: 1599,
    tag: "New Arrival",
    image: longFrockFloral,
  },
  {
    id: 55,
    name: "Cotton Short Kurti",
    category: "Dresses",
    type: "Short Kurtis",
    material: "Cotton",
    color: "Yellow",
    price: 699,
    tag: "Daily Wear",
    image: shortKurtiCotton,
  },

  //  jewellery sets
  {
    id: 15, name: "Gold Necklace Set", category: "Jewellery",
    type: "Temple Jewellery", material: "Gold-tone alloy", color: "Antique gold",
    price: 3299, tag: "Bestseller", image: goldNecklaceImage,
  },
  {
    id: 16, name: "Diamond Necklace", category: "Jewellery",
 type: "Statement Necklace", material: "Silver-tone alloy", color: "Silver & crystal",
 price: 4599, tag: "Elegant",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 17, name: "Everyday Minimal Chain", category: "Jewellery",
    type: "Daily Wear Chain", material: "Gold-tone alloy", color: "Gold",
    price: 899, tag: "Daily wear", image: shortNecklaceImage,
  },
  {
    id: 18, name: "Long Lakshmi Haram", category: "Jewellery",
    type: "Long Haram", material: "Antique gold-tone alloy", color: "Antique gold",
    price: 3899, tag: "Traditional",
    image: longLakshmiHaramImage,
  },
  {
    id: 19, name: "Pearl Choker Necklace", category: "Jewellery",
    type: "Choker Necklace", material: "Gold-tone alloy & pearls", color: "Gold & ivory",
    price: 2499, tag: "Elegant", image: pearlChokerImage,
  },
  {
    id: 20, name: "Gold Bangles", category: "Jewellery",
    type: "Bangles", material: "Gold-tone alloy", color: "Gold",
    price: 2199, tag: "Classic", image: traditionalGoldBanglesImage,
  },
  {
    id: 21, name: "Sculpted Gold Bracelet", category: "Jewellery",
    type: "Bracelet", material: "Gold-tone alloy", color: "Gold",
    price: 1299, tag: "Modern", image: sculptedGoldBraceletImage,
  },
  {
    id: 22, name: "Statement Vaddanam", category: "Jewellery",
    type: "Waist Belt", material: "Antique gold-tone alloy", color: "Gold & ruby",
    price: 4999, tag: "Bridal edit", image: statementVaddanamImage,
  },
  {
    id: 23, name: "Ruby Jhumka Earrings", category: "Jewellery",
    type: "Jhumka Earrings", material: "Gold-tone alloy", color: "Gold & ruby",
    price: 1499, tag: "Festive pick", image: rubyJhumkaImage,
  },
  {
    id: 24, name: "Gold Ring Collection", category: "Jewellery",
    type: "Rings", material: "Gold-tone alloy", color: "Gold",
    price: 699, tag: "Daily wear", image: goldRingsImage,
  },
  {
    id: 25, name: "Gold Bracelet", category: "Jewellery",
    type: "Classic Bracelet", material: "Gold-tone alloy", color: "Gold",
    price: 1899, tag: "Minimal", image: goldBraceletImage,
  },
  {
    id: 26, name: "Pearl Drop Earrings", category: "Jewellery",
    type: "Drop Earrings", material: "Gold-tone alloy & pearls", color: "Gold & ivory",
    price: 1199, tag: "Minimal", image: pearlDropEarringsImage,
  },
  
  {
    id: 32, name: "Ruby Bridal Necklace Set", category: "Jewellery",
    type: "Bridal Necklace Set", material: "Gold-tone alloy with ruby-tone stones", color: "Gold & ruby",
    price: 4599, tag: "Bridal edit",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 33, name: "Pearl Layered Bracelet", category: "Jewellery",
    type: "Layered Bracelet", material: "Gold-tone alloy & faux pearls", color: "Gold & ivory",
    price: 3299, tag: "Elegant",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
  },
];
const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
const revealTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };
function Reveal({ children, className, delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={reduceMotion ? { duration: 0 } : { ...revealTransition, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
function FloatingJewellery() {
  const ring = useRef(null);
  const gem = useRef(null);
  useFrame((state, delta) => {
    if (ring.current) {
      ring.current.rotation.y += delta * 0.35;
      ring.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.18;
    }
    if (gem.current) gem.current.rotation.y -= delta * 0.45;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.65}>
      <group>
        <mesh ref={ring} rotation={[1.1, 0.2, 0.3]}>
          <torusGeometry args={[1.05, 0.13, 24, 100]} />
          <meshStandardMaterial color="#c7a15b" metalness={0.95} roughness={0.18} />
        </mesh>
        <mesh ref={gem} position={[0, 1.05, 0]}>
          <octahedronGeometry args={[0.35, 1]} />
          <meshPhysicalMaterial
            color="#f5d6e4"
            metalness={0.15}
            roughness={0.05}
            transmission={0.35}
            thickness={1}
            clearcoat={1}
          />
        </mesh>
      </group>
    </Float>
  );
}
function ThreeDJewellery() {
  return (
    <div className="three-canvas">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <pointLight position={[-3, -2, 2]} intensity={1.3} color="#f7d8e5" />
        <FloatingJewellery />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
        <Environment preset="studio" />
      </Canvas>
      <span className="drag-hint">Drag to explore in 3D</span>
    </div>
  );
}
function ProductCard({ product, onAdd, onWishlist, wished, onDetails }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ ...revealTransition, duration: 0.55 }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
    >
      <button
        className={`wish-btn ${wished ? "wished" : ""}`}
        onClick={() => onWishlist(product.id)}
        aria-label={`Add ${product.name} to wishlist`}
        type="button"
      >
        <Heart size={18} fill={wished ? "currentColor" : "none"} />
      </button>
      <button
        className="product-image-wrap"
        onClick={() => onDetails(product)}
        aria-label={`Quick view ${product.name}`}
        type="button"
      >
        {!imageFailed ? (
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="image-fallback">
            <Sparkles size={30} />
            <span>{product.name}</span>
            <small>Image unavailable</small>
          </div>
        )}
        <span className="product-tag">{product.tag}</span>
        <span className="quick-view"><Eye size={15} /> Quick view</span>
      </button>
      <div className="product-info">
        <span className="product-type">{product.type}</span>
        <h3>{product.name}</h3>
        <p className="product-meta">{product.material} · {product.color}</p>
        <div className="product-bottom">
          <strong>{formatPrice(product.price)}</strong>
          <button className="add-btn" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to bag`} type="button">
            <Plus size={17} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
function Storefront() {
  const [category, setCategory] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const categories = ["All", "Sarees", "Half Sarees", "Dresses", "Jewellery"];
  const availableTypes = useMemo(() => {
    const matching = category === "All" ? products : products.filter((p) => p.category === category);
    return ["All types", ...new Set(matching.map((p) => p.type))];
  }, [category]);
  const visibleProducts = useMemo(() => {
    const term = search.toLowerCase().trim();
    return products.filter((p) => {
      const categoryMatch = category === "All" || p.category === category;
      const typeMatch = typeFilter === "All types" || p.type === typeFilter;
      const searchMatch = !term || [p.name, p.category, p.type, p.material, p.color]
        .some((value) => value.toLowerCase().includes(term));
      return categoryMatch && typeMatch && searchMatch;
    });
  }, [category, typeFilter, search]);
  const topVisibleProducts = visibleProducts.filter((product) => product.category !== "Jewellery");
  const jewelleryProducts = products.filter((product) => product.category === "Jewellery");

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  function chooseCategory(value) {
  setCategory(value);
  setTypeFilter("All types");
  setMobileMenu(false);

  if (value === "Jewellery") {
    setTimeout(() => {
      document
        .getElementById("jewellery-collection")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  } else {
    document.getElementById("collections")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
  function addToCart(product) {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);
      return exists
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
    // Show the shopping bag immediately so the add action is visible.
    setCartOpen(true);
  }
  function showAllPieces() {
    setCategory("All");
    setTypeFilter("All types");
    setSearch("");
    setMobileMenu(false);
    document.getElementById("collections")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function changeQuantity(id, amount) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }
  function toggleWishlist(id) {
    setWishlist((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  }
  return (
    <div className="store">
      <div className="announcement">
        <Sparkles size={14} /> A little luxury, made for your moments <span>✦</span> Discover the new collection
      </div>
      <motion.header
        className="site-header"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu" type="button">
          {mobileMenu ? <X /> : <Menu />}
        </button>
        <a href="#home" className="brand" aria-label="Madhu Sahasra Fashions home">
          <img src={madhuSahasraLogo} alt="Madhu Sahasra Fashions logo" className="brand-logo" />
          <span className="brand-text"><strong>MADHU SAHASRA</strong><small>SAREES · DRESSES · JEWELLERY</small></span>
        </a>
        <nav className={mobileMenu ? "main-nav nav-open" : "main-nav"}>
          {categories.map((item) => (
            <button key={item} className={category === item ? "nav-active" : ""} onClick={() => chooseCategory(item)} type="button">
              {item === "All" ? "Home" : item}
            </button>
          ))}
          <a href="#story" onClick={() => setMobileMenu(false)}>Our Story</a>
        </nav>
        <div className="header-actions">
          <label className="header-search">
            <Search size={17} />
            <input
              id="product-search"
              name="productSearch"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pieces..."
            />
          </label>
          <button className="icon-action" onClick={() => document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" })} aria-label="Wishlist" type="button">
            <Heart size={20} />
            {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
          </button>
          <button className="icon-action bag-action" onClick={() => setCartOpen(true)} aria-label="Shopping bag" type="button">
            <ShoppingBag size={20} /><span className="count-badge">{cartCount}</span>
          </button>
        </div>
      </motion.header>
      <main>
        <motion.section className="hero" id="home" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } } }}>
          <motion.div className="hero-copy" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { ...revealTransition, duration: 0.75 } } }}>
            <span className="eyebrow"><span className="eyebrow-line" /> THE ART OF INDIAN ELEGANCE</span>
            <h1>Tradition, women<br />with <em>modern grace.</em></h1>
            <p>Discover beautiful sarees and thoughtfully chosen jewellery for every celebration, every ritual, and every little moment.</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => chooseCategory("Sarees")} type="button">Explore Sarees <ArrowRight size={17} /></button>
              <button className="text-btn" onClick={() => chooseCategory("Jewellery")} type="button">Shop Jewellery</button>
            </div>
            <div className="hero-note">
              <span className="note-stars">✦ ✦ ✦</span>
              <span>Timeless styles · Thoughtful details</span>
            </div>
          </motion.div>
          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.97, x: 18 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            <div className="hero-photo hero-photo-back">
              <img src={sareeHeroImage} alt="Model wearing a luxurious blush-pink and gold silk saree with traditional jewellery" />
            </div>
<div className="hero-stamp"><span>CURATED</span><strong>with love</strong><span>✦ MADHU SAHASRA ✦</span></div>
            <div className="hero-sparkle sparkle-one">✦</div>
            <div className="hero-sparkle sparkle-two">✧</div>
          </motion.div>
          <div className="hero-bottom"><span>01 — 03</span><span className="hero-bottom-line" /><span>THE FESTIVE EDIT</span></div>
        </motion.section>
        <motion.section className="benefits" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={revealTransition}>
          <div><span className="benefit-icon">✧</span><span><strong>Thoughtfully Curated</strong><small>Pieces you'll treasure</small></span></div>
          <div><span className="benefit-icon">◇</span><span><strong>Everyday to Occasion</strong><small>Styles for every moment</small></span></div>
          <div><span className="benefit-icon">♧</span><span><strong>Made to Feel Special</strong><small>Details that delight</small></span></div>
          <div><span className="benefit-icon">♡</span><span><strong>A Gift of Elegance</strong><small>Find something meaningful</small></span></div>
        </motion.section>
        <motion.section className="category-section section-pad" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={revealTransition}>
          <div className="section-heading">
            <span className="eyebrow">EXPLORE OUR WORLD</span>
            <h2>Find your kind of <em>beautiful.</em></h2>
            <p>From heirloom-inspired drapes to everyday sparkle, explore a collection for every version of you.</p>
          </div>
          <div className="category-tiles">
            <motion.button whileHover={{ y: -5 }} whileTap={{ scale: 0.99 }} className="category-tile saree-tile" onClick={() => chooseCategory("Sarees")} type="button">
              <img src={sareeHeroImage} alt="Silk saree collection" />
              <span className="tile-shade" /><span className="tile-copy"><small>THE TIMELESS CLASSIC</small><strong>Sarees</strong><span>Explore collection <ArrowRight size={15} /></span></span>
            </motion.button>
            <motion.button whileHover={{ y: -5 }} whileTap={{ scale: 0.99 }} className="category-tile half-tile" onClick={() => chooseCategory("Half Sarees")} type="button">
              <img src={goldenBloomHalfSareeImage} alt="Half saree collection" />
              <span className="tile-shade" /><span className="tile-copy"><small>YOUTHFUL TRADITION</small><strong>Half Sarees</strong><span>Explore collection <ArrowRight size={15} /></span></span>
            </motion.button>
            <motion.button whileHover={{ y: -5 }} whileTap={{ scale: 0.99 }} className="category-tile dresses-tile" onClick={() => chooseCategory("Dresses")} type="button">
              <img src={longFrockFloral} alt="Dresses collection" />
              <span className="tile-shade" /><span className="tile-copy"><small>EVERYDAY TO OCCASION</small><strong>Dresses</strong><span>Explore collection <ArrowRight size={15} /></span></span>
            </motion.button>
</div>
        </motion.section>
        <motion.section className="products-section section-pad" id="collections" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="products-heading">
            <div><span className="eyebrow">THE MADHU SAHASRA EDIT</span><h2>Pieces to <em>fall for.</em></h2><p>Discover styles selected for their color, craft, and character.</p></div>
            <div className="product-count">{topVisibleProducts.length} pieces to explore</div>
          </div>
          <div className="filter-bar">
            <div className="category-filters">
              {categories.map((item) => (
                <button key={item} onClick={() => chooseCategory(item)} className={category === item ? "filter-active" : ""} type="button">{item}</button>
              ))}
            </div>
            <select id="product-type-filter" name="productType" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Filter by product type">
              {availableTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          {topVisibleProducts.length > 0 ? (
            <div className="product-grid">
              {topVisibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onWishlist={toggleWishlist}
                  wished={wishlist.includes(product.id)}
                  onDetails={setSelected}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state"><Search size={30} /><h3>{category === "Jewellery" ? "Jewellery collection is below" : "No pieces found"}</h3><p>{category === "Jewellery" ? "Your jewellery products are displayed after the 3D ring experience." : "Try another search or choose a different category."}</p><button className="primary-btn" onClick={() => document.getElementById("jewellery-collection")?.scrollIntoView({ behavior: "smooth", block: "start" })} type="button">View Jewellery Collection <ArrowRight size={17} /></button></div>
          )}
          <div className="view-all-wrap"><span>Made for your moments, chosen by you.</span><button className="outline-btn" onClick={showAllPieces} type="button">Show all pieces <ArrowRight size={16} /></button></div>
        </motion.section>
        <motion.section className="showcase-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={revealTransition}>
          <div className="showcase-copy">
            <span className="eyebrow">A LITTLE EXTRA MAGIC</span>
            <h2>
  Elegance in <br />
  <em>every detail.</em>
</h2>
            <p>
  Discover our beautiful collection of necklaces, earrings, bangles, and
  elegant gold jewellery. Find the perfect finishing touch for every
  celebration and special occasion.
</p>
            
            <div className="showcase-caption"><span>✦</span> Designed to catch the light</div>
          </div>

          <div className="showcase-visual">
            <div className="showcase-orbit orbit-one" /><div className="showcase-orbit orbit-two" />
            <ThreeDJewellery />
            <span className="showcase-label">THE GOLDEN EDIT · 3D</span>
          </div>
        </motion.section>
        {/* Jewellery is showcased separately after the 3D ring experience. */}
        <motion.section
          className="jewellery-feature section-pad"
          id="jewellery-collection"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={revealTransition}
        >
          <div className="section-heading">
            <span className="eyebrow">THE FINISHING TOUCH</span>
            <h2>Jewellery that <em>makes a statement.</em></h2>
            <p>
              Discover elegant necklaces, bangles, earrings and timeless pieces
              for your special moments.
            </p>
            
          </div>
          <div className="category-tiles jewellery-feature-tile">
            
          </div>
        <div className="product-grid jewellery-product-grid">
            {jewelleryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                onWishlist={toggleWishlist}
                wished={wishlist.includes(product.id)}
                onDetails={setSelected}
              />
            ))}
          </div>
        </motion.section>
        <motion.section className="story-section section-pad" id="story" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={revealTransition}>
          <div className="story-image story-image-animated">
            <div className="story-image-glow" aria-hidden="true" />
            <img className="story-woman-photo" src={ourStoryWomanImage} alt="Woman wearing an elegant silk saree and traditional gold jewellery" />
            <span className="story-petal petal-one" aria-hidden="true">✿</span>
            <span className="story-petal petal-two" aria-hidden="true">✧</span>
            <span className="story-petal petal-three" aria-hidden="true">✿</span>
            <span className="story-image-label">TIMELESS BY NATURE</span>
          </div>
          <div className="story-copy"><span className="eyebrow">OUR PHILOSOPHY</span><h2>Tradition is not just worn.<br /><em>It's felt.</em></h2><p>Madhu Sahasra Fashions celebrates the beauty of Indian dressing: the richness of a saree, the joy of a half saree, and the finishing touch of jewellery.</p><p>Our collection is imagined for family celebrations, special occasions, and the everyday moments worth dressing up for.</p><button className="text-btn" onClick={() => chooseCategory("All")} type="button">Discover the collection <ArrowRight size={16} /></button></div>
        </motion.section>
        <motion.section className="newsletter" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={revealTransition}>
          <span className="eyebrow">NOTES FROM MADHU SAHASRA</span><h2>A little beauty in your inbox.</h2><p>New collections, styling inspiration, and special moments — coming soon.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Newsletter signup demo only. Connect an email service before launch."); }}>
            <input id="newsletter-email" name="email" type="email" required placeholder="Your email address" aria-label="Your email address" />
            <button type="submit">Keep me inspired <ArrowRight size={16} /></button>
          </form>
        </motion.section>
      </main>
      <motion.footer className="site-footer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <a href="#home" className="brand footer-brand" aria-label="Madhu Sahasra Fashions home"><img src={madhuSahasraLogo} alt="Madhu Sahasra Fashions logo" className="brand-logo" /><span className="brand-text"><strong>MADHU SAHASRA</strong><small>SAREES · DRESSES · JEWELLERY</small></span></a>
        <p>Tradition, women with modern grace.</p>
        <div className="footer-links"><button onClick={() => chooseCategory("Sarees")} type="button">Sarees</button><button onClick={() => chooseCategory("Half Sarees")} type="button">Half Sarees</button><button onClick={() => chooseCategory("Dresses")} type="button">Dresses</button><button onClick={() => chooseCategory("Jewellery")} type="button">Jewellery</button></div>
        <small className="copyright">© {new Date().getFullYear()} Madhu Sahasra Fashions. Demo storefront.</small>
      </motion.footer>
      {selected && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} onClick={() => setSelected(null)}>
          <motion.div className="product-modal" initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={revealTransition} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details" type="button"><X /></button>
            <div className="modal-product-image">
              <img src={selected.image} alt={selected.name} onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <div className="modal-3d-label"><Sparkles size={14} /> Product preview</div>
            </div>
            <div className="modal-details">
              <span className="eyebrow">{selected.category} · {selected.type}</span>
              <h2>{selected.name}</h2>
              <strong className="modal-price">{formatPrice(selected.price)}</strong>
              <p>Material: {selected.material}</p><p>Color: {selected.color}</p>
              <p className="demo-note">Product details and prices are sample data for this design preview.</p>
              <button className="primary-btn" onClick={() => { addToCart(selected); setSelected(null); setCartOpen(true); }} type="button">Add to bag <ShoppingBag size={17} /></button>
            </div>
          </motion.div>
        </motion.div>
      )}
      {cartOpen && (
        <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} onClick={() => setCartOpen(false)}>
          <motion.aside className="cart-drawer" initial={{ x: 36, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={revealTransition} onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header"><div><span className="eyebrow">YOUR SELECTION</span><h2>Shopping bag ({cartCount})</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close bag" type="button"><X /></button></div>
            {cart.length === 0 ? (
              <div className="empty-cart"><ShoppingBag size={38} /><h3>Your bag is waiting.</h3><p>Find a piece that feels like you.</p><button className="primary-btn" onClick={() => { setCartOpen(false); chooseCategory("All"); }} type="button">Explore pieces</button></div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      <div className="cart-item-info"><strong>{item.name}</strong><small>{item.color}</small><b>{formatPrice(item.price)}</b><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity" type="button"><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity" type="button"><Plus size={13} /></button></div></div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div><small>Shipping and taxes calculated at checkout.</small><button className="primary-btn" onClick={() => alert("Checkout is not connected yet. Add a secure payment and order backend before accepting real orders.")} type="button">Continue to checkout <ArrowRight size={17} /></button><button className="text-btn" onClick={() => setCartOpen(false)} type="button">Continue shopping</button></div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </div>
  );
}
export default function App() {
  const path = window.location.pathname;

  if (path === "/admin" || path === "/admin/") {
    return <AdminLogin />;
  }

  return <Storefront />;
}