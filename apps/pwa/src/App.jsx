import React, { useState, useEffect } from 'react';

const BURGERS_DATA = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'especiales',
    price: 14.99,
    specialty_badge: '👑 Corona de Oro • Legendaria',
    specialty_level: 'Legendaria',
    badgeColor: '#b45309',
    badgeBg: '#fef3c7',
    rating: 4.9,
    prep_time: '12 min',
    calories: '920 kcal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: 'Doble carne Angus madurada 180g, queso cheddar inglés añejo fundido, cebolla caramelizada al bourbon y panceta crocante.',
    ingredients: ['Doble Carne Angus', 'Cheddar Añejo', 'Bacon Crujiente', 'Cebolla al Bourbon', 'Pan Brioche']
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'clasicas',
    price: 10.99,
    specialty_badge: '⭐ Clásica Premium • Signature',
    specialty_level: 'Signature',
    badgeColor: '#1e40af',
    badgeBg: '#eff6ff',
    rating: 4.8,
    prep_time: '8 min',
    calories: '740 kcal',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    description: 'Carne a las brasas de quebracho, queso americano fundido, pepinillos encurtidos en casa, tomate fresco y salsa imperial.',
    ingredients: ['Carne Res Selecta', 'Queso Americano', 'Pepinillos Dulces', 'Tomate & Lechuga', 'Salsa Imperial']
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'dobles',
    price: 13.50,
    specialty_badge: '🔥 Doble Poder • Élite',
    specialty_level: 'Élite',
    badgeColor: '#b91c1c',
    badgeBg: '#fef2f2',
    rating: 4.9,
    prep_time: '10 min',
    calories: '980 kcal',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    description: 'Doble medallón 300g corte fino, doble Monterey Jack, doble tocino ahumado en madera de manzano y mayonesa trufada.',
    ingredients: ['Doble Medallón 300g', 'Doble Monterey Jack', 'Bacon Ahumado', 'Cebolla Morada', 'Mayo Trufada']
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'especiales',
    price: 14.25,
    specialty_badge: '🏆 Creación Exclusiva • Master',
    specialty_level: 'Master',
    badgeColor: '#6b21a8',
    badgeBg: '#faf5ff',
    rating: 4.9,
    prep_time: '11 min',
    calories: '960 kcal',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80',
    description: 'Doble carne smash caramelizada, aros de cebolla crocantes a la cerveza, relish de jalapeños dulces y cuatro quesos fundidos.',
    ingredients: ['Doble Smash Caramelizado', 'Aros de Cebolla Cerveceros', 'Relish Jalapeño', 'Salsa 4 Quesos']
  },
  {
    id: 5,
    name: 'Burger Trufa & Portobello',
    category: 'gourmet',
    price: 15.50,
    specialty_badge: '🍄 Gourmet Supreme • Black Label',
    specialty_level: 'Black Label',
    badgeColor: '#1c1917',
    badgeBg: '#fef9c3',
    rating: 5.0,
    prep_time: '13 min',
    calories: '830 kcal',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=600&auto=format&fit=crop&q=80',
    description: 'Carne Angus de pastoreo, setas Portobello glaseadas al tomillo, queso Gouda holandés madurado y alioli de trufa negra.',
    ingredients: ['Angus Pastoreo 200g', 'Portobello Confitado', 'Queso Gouda', 'Alioli de Trufa', 'Rúcula Selvática']
  },
  {
    id: 6,
    name: 'Burger Smoked BBQ Bacon',
    category: 'especiales',
    price: 12.75,
    specialty_badge: '🪵 Ahumado Roble • Artesanal',
    specialty_level: 'Artesanal',
    badgeColor: '#c2410c',
    badgeBg: '#fff7ed',
    rating: 4.8,
    prep_time: '9 min',
    calories: '860 kcal',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80',
    description: 'Medallón ahumado a la leña, tocino rústico grueso, queso Pepper Jack fundente, cebolla crispy y salsa BBQ de agave.',
    ingredients: ['Carne Ahumada Leña', 'Bacon Grueso', 'Pepper Jack', 'Cebolla Crispy', 'BBQ Casera']
  },
  {
    id: 7,
    name: 'Burger Crispy Royal Chicken',
    category: 'clasicas',
    price: 11.80,
    specialty_badge: '🍗 Crunch Dorado • Superior',
    specialty_level: 'Superior',
    badgeColor: '#047857',
    badgeBg: '#ecfdf5',
    rating: 4.7,
    prep_time: '10 min',
    calories: '780 kcal',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    description: 'Pechuga marinada 24h en buttermilk y hierbas finas, rebozado crocante panko, ensalada coleslaw fresca y honey mustard.',
    ingredients: ['Pechuga Buttermilk 24h', 'Panko Dorado Crunch', 'Coleslaw Morada', 'Honey Mustard']
  },
  {
    id: 8,
    name: 'Burger Spicy Chipotle Fire',
    category: 'especiales',
    price: 12.90,
    specialty_badge: '🌶️ Fuego Bravo • Intenso',
    specialty_level: 'Intenso',
    badgeColor: '#b91c1c',
    badgeBg: '#fef2f2',
    rating: 4.8,
    prep_time: '9 min',
    calories: '810 kcal',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80',
    description: 'Carne Angus con sazón cajún, queso provolone ahumado, rodaja de piña asada al grill, chiles jalapeños y mayo chipotle.',
    ingredients: ['Angus Sazón Cajún', 'Provolone Ahumado', 'Piña Asada al Grill', 'Jalapeños', 'Chipotle Cream']
  },
  {
    id: 9,
    name: 'Burger Guacamole & Queso Fundido',
    category: 'gourmet',
    price: 13.20,
    specialty_badge: '🥑 Frescura Viva • Selección',
    specialty_level: 'Selección',
    badgeColor: '#065f46',
    badgeBg: '#ecfdf5',
    rating: 4.7,
    prep_time: '10 min',
    calories: '840 kcal',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80',
    description: 'Medallón jugoso con guacamole fresco de aguacate Hass martajado, pico de gallo, totopos de maíz azul y queso Oaxaca fundido.',
    ingredients: ['Carne Res Grill', 'Guacamole Fresco Hass', 'Pico de Gallo', 'Totopos Azules', 'Queso Oaxaca Fundente']
  },
  {
    id: 10,
    name: 'Burger Smash Monster Cuádruple',
    category: 'dobles',
    price: 16.90,
    specialty_badge: '⚡ Monster Legend • Colosal',
    specialty_level: 'Colosal',
    badgeColor: '#6b21a8',
    badgeBg: '#faf5ff',
    rating: 4.9,
    prep_time: '14 min',
    calories: '1180 kcal',
    image: 'https://images.unsplash.com/photo-1583032015879-166c42959885?w=600&auto=format&fit=crop&q=80',
    description: 'Cuatro patties smash ultrafinos con costra caramelizada extrema (400g carne), cuatro pisos de cheddar y salsa secreta Rapid XL.',
    ingredients: ['4 Medallones Smash (400g)', '4 Capas Cheddar Fundido', 'Pepinillos en Juliana', 'Salsa Rapid XL']
  }
];

const INITIAL_OFFERS = [
  {
    id: 'OFF-1',
    title: '👑 Combo Pareja Real 2x1',
    tag: 'MÁS VENDIDO',
    tagBg: '#fef3c7',
    tagColor: '#92400e',
    desc: 'Rey de las Burgers + Burger Real Clásica + 2 Papas Rústicas Trufadas.',
    price: 21.99,
    originalPrice: 29.48,
    discount: 'Ahorras 25%',
    itemsToAdd: [
      { id: 1, name: 'Rey de las Burgers', price: 14.99, quantity: 1 },
      { id: 2, name: 'Burger Real Clásica', price: 10.99, quantity: 1 }
    ]
  },
  {
    id: 'OFF-2',
    title: '🔥 Viernes de Doble Carne',
    tag: 'EXCLUSIVO HOY',
    tagBg: '#fee2e2',
    tagColor: '#991b1b',
    desc: 'Lleva tu Burger Real Doble con 20% de descuento automático o aplica cupón DOBLE20.',
    price: 10.80,
    originalPrice: 13.50,
    discount: '20% OFF',
    itemsToAdd: [
      { id: 3, name: 'Burger Real Doble (Promo)', price: 10.80, quantity: 1 }
    ]
  },
  {
    id: 'OFF-3',
    title: '🍔 Smash Party Trío',
    tag: 'AHORRO FAMILIAR',
    tagBg: '#e0e7ff',
    tagColor: '#3730a3',
    desc: 'Burger Doble Especial + 2 Burger Real Clásica para compartir con amigos.',
    price: 28.50,
    originalPrice: 36.23,
    discount: 'Ahorras $7.73',
    itemsToAdd: [
      { id: 4, name: 'Burger Doble Especial', price: 14.25, quantity: 1 },
      { id: 2, name: 'Burger Real Clásica', price: 10.99, quantity: 2 }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('menu'); // menu | ofertas | ordenes | perfil
  const [burgers, setBurgers] = useState(BURGERS_DATA);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Shopping Cart & Order Simulation
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBurger, setSelectedBurger] = useState(null); // For modal customization
  const [selectedSides, setSelectedSides] = useState({ fries: false, onionRings: false, drink: false });
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: 'ORD-7821',
      customerName: 'Valentina Restrepo',
      items: [
        { id: 1, name: 'Rey de las Burgers', quantity: 2, price: 14.99 },
        { id: 3, name: 'Burger Real Doble', quantity: 1, price: 13.50 }
      ],
      total: 43.48,
      statusStep: 2, // 1: confirmado, 2: en cocina, 3: en camino, 4: entregado
      statusText: 'En Parrilla & Cocina 👨‍🍳',
      address: 'Av. Del Libertador 1420, Depto 5B',
      createdAt: 'Hace 12 min',
      estimatedArrival: '15-20 min'
    },
    {
      id: 'ORD-7815',
      customerName: 'Valentina Restrepo',
      items: [
        { id: 4, name: 'Burger Doble Especial', quantity: 1, price: 14.25 },
        { id: 5, name: 'Burger Trufa & Portobello', quantity: 1, price: 15.50 }
      ],
      total: 29.75,
      statusStep: 4,
      statusText: 'Entregado con Éxito ✅',
      address: 'Av. Del Libertador 1420, Depto 5B',
      createdAt: 'Ayer, 20:30',
      estimatedArrival: 'Completado'
    }
  ]);

  // Online & PWA Install
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    // Try fetching products from backend if running
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setBurgers(data.data);
        }
      })
      .catch(() => console.log('Operando con catálogo embebido de alta velocidad.'));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('Para instalar esta PWA: En tu navegador selecciona "Instalar aplicación" o "Agregar a pantalla de inicio".');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  // Cart Functions
  const addToCart = (burger, quantity = 1, extras = []) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === burger.id && JSON.stringify(item.extras || []) === JSON.stringify(extras));
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, {
        id: burger.id,
        name: burger.name,
        price: burger.price,
        image: burger.image,
        quantity,
        extras
      }];
    });
  };

  const updateCartQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      updated[index].quantity += delta;
      if (updated[index].quantity <= 0) {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  const addOfferToCart = (offer) => {
    offer.itemsToAdd.forEach(item => {
      const burger = burgers.find(b => b.id === item.id) || {
        id: item.id,
        name: item.name,
        price: item.price,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80'
      };
      addToCart(burger, item.quantity);
    });
    setIsCartOpen(true);
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'RAPIDVIP' || code === 'BURGER15') {
      setAppliedDiscount(0.15);
      setCouponMessage('¡Cupón del 15% de descuento aplicado!');
    } else if (code === 'DOBLE20') {
      setAppliedDiscount(0.20);
      setCouponMessage('¡Cupón del 20% en Doble Carne aplicado!');
    } else if (code === 'RAPIDFREE') {
      setAppliedDiscount(0.10);
      setCouponMessage('¡Cupón de Envío Bonificado aplicado!');
    } else {
      setAppliedDiscount(0);
      setCouponMessage('Cupón inválido. Prueba con RAPIDVIP');
    }
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = cartSubtotal * appliedDiscount;
  const deliveryFee = cartSubtotal > 20 || cartSubtotal === 0 ? 0 : 2.50;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Simulate Purchase (Simulación de compra)
  const handleSimulatePurchase = () => {
    if (cart.length === 0) return;
    setIsSimulating(true);

    setTimeout(() => {
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: 'Valentina Restrepo',
        items: [...cart],
        total: parseFloat(cartTotal.toFixed(2)),
        statusStep: 1,
        statusText: 'Pedido Recibido • En Cocina 👨‍🍳',
        address: 'Av. Del Libertador 1420, Depto 5B',
        createdAt: 'Hace un instante',
        estimatedArrival: '18-22 min'
      };

      // Sync with server API in background
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: newOrder.customerName,
          items: newOrder.items,
          total: newOrder.total,
          address: newOrder.address
        })
      }).catch(e => console.log('Orden guardada localmente en la PWA'));

      setOrders(prev => [newOrder, ...prev]);
      setCart([]);
      setIsSimulating(false);
      setSimulationSuccess(true);
    }, 1200);
  };

  const advanceOrderStatus = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const nextStep = Math.min(4, order.statusStep + 1);
        let nextText = order.statusText;
        if (nextStep === 2) nextText = 'En Parrilla & Cocina 👨‍🍳';
        if (nextStep === 3) nextText = 'En Camino con Repartidor 🛵';
        if (nextStep === 4) nextText = 'Entregado con Éxito 🎉';
        return {
          ...order,
          statusStep: nextStep,
          statusText: nextText
        };
      }
      return order;
    }));
  };

  // Filtered Burgers
  const filteredBurgers = burgers.filter(b => {
    const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (b.description && b.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc', position: 'relative' }}>
      
      {/* Top Mobile Bar */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 18px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>🍔</span>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.05rem', color: '#1c1917', lineHeight: 1.1 }}>
                Hamburger <span style={{ color: '#c2410c' }}>Rapid</span>
              </div>
              <small style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '600' }}>
                PWA Delivery Express
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '0.72rem',
              padding: '3px 8px',
              borderRadius: '9999px',
              fontWeight: '700',
              background: isOnline ? '#ecfdf5' : '#fef2f2',
              color: isOnline ? '#059669' : '#dc2626',
              border: `1px solid ${isOnline ? '#a7f3d0' : '#fecaca'}`
            }}>
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </span>

            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                style={{
                  background: '#c2410c',
                  color: 'white',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Instalar
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingBottom: '90px' }}>
        
        {/* ================= TAB 1: MENÚ ================= */}
        {activeTab === 'menu' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="Buscar hamburguesa o ingrediente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  color: '#1e293b',
                  outline: 'none',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                }}
              />
              <span style={{ position: 'absolute', left: '14px', top: '12px', color: '#94a3b8' }}>🔍</span>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
              {[
                { id: 'all', label: 'Todas (10)' },
                { id: 'especiales', label: 'Especiales' },
                { id: 'clasicas', label: 'Clásicas' },
                { id: 'dobles', label: 'Dobles & Smash' },
                { id: 'gourmet', label: 'Gourmet' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '9999px',
                    border: '1px solid',
                    borderColor: categoryFilter === cat.id ? '#c2410c' : '#e2e8f0',
                    background: categoryFilter === cat.id ? '#c2410c' : '#ffffff',
                    color: categoryFilter === cat.id ? '#ffffff' : '#64748b',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: categoryFilter === cat.id ? '0 2px 8px rgba(194, 65, 12, 0.25)' : 'none'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Featured Highlight Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
              border: '1px solid #fed7aa',
              borderRadius: '16px',
              padding: '14px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(194, 65, 12, 0.05)'
            }}>
              <div>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  color: '#9a3412',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  ⭐ Creaciones de Autor
                </span>
                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#7c2d12', marginTop: '2px' }}>
                  Rey de las Burgers & Real Doble
                </div>
                <div style={{ fontSize: '0.78rem', color: '#9a3412', marginTop: '2px' }}>
                  Carne Angus a la parrilla con pan brioche artesanal.
                </div>
              </div>
              <button
                onClick={() => {
                  const rey = burgers.find(b => b.id === 1);
                  if (rey) addToCart(rey, 1);
                }}
                style={{
                  background: '#c2410c',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                + Probar $14.99
              </button>
            </div>

            {/* Burger List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredBurgers.map(burger => (
                <div
                  key={burger.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '12px',
                    display: 'flex',
                    gap: '12px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    position: 'relative'
                  }}
                >
                  <img
                    src={burger.image}
                    alt={burger.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      flexShrink: 0
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Badge */}
                      <span style={{
                        display: 'inline-block',
                        fontSize: '0.68rem',
                        fontWeight: '800',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: burger.badgeBg || '#fef3c7',
                        color: burger.badgeColor || '#92400e',
                        marginBottom: '4px'
                      }}>
                        {burger.specialty_badge}
                      </span>

                      <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#1c1917', lineHeight: 1.2 }}>
                        {burger.name}
                      </div>

                      <div style={{
                        fontSize: '0.78rem',
                        color: '#64748b',
                        marginTop: '3px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {burger.description}
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '8px',
                      paddingTop: '6px',
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#c2410c' }}>
                        ${parseFloat(burger.price).toFixed(2)}
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => setSelectedBurger(burger)}
                          style={{
                            background: '#f1f5f9',
                            color: '#475569',
                            border: 'none',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          Detalles
                        </button>
                        <button
                          onClick={() => addToCart(burger, 1)}
                          style={{
                            background: '#c2410c',
                            color: '#ffffff',
                            border: 'none',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(194, 65, 12, 0.25)'
                          }}
                        >
                          + Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB 2: OFERTAS ================= */}
        {activeTab === 'ofertas' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#1c1917' }}>
                🔥 Ofertas & Combos Rapid
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Promociones exclusivas para pedidos en la app móvil.
              </p>
            </div>

            {/* Coupon Card */}
            <div style={{
              background: 'linear-gradient(135deg, #1c1917, #332f2c)',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '18px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{
                    fontSize: '0.7rem',
                    background: '#f59e0b',
                    color: '#1c1917',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '9999px'
                  }}>
                    CUPÓN ACTIVO
                  </span>
                  <div style={{ fontSize: '1.25rem', fontWeight: '900', marginTop: '6px' }}>
                    15% OFF en tu primer pedido
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#d6d3d1', marginTop: '2px' }}>
                    Código promocional: <strong style={{ color: '#fef08a' }}>RAPIDVIP</strong>
                  </div>
                </div>
                <div style={{ fontSize: '2rem' }}>🎁</div>
              </div>
              <button
                onClick={() => {
                  setCouponCode('RAPIDVIP');
                  setAppliedDiscount(0.15);
                  setCouponMessage('¡Cupón RAPIDVIP del 15% aplicado!');
                  setIsCartOpen(true);
                }}
                style={{
                  marginTop: '14px',
                  width: '100%',
                  background: '#c2410c',
                  color: 'white',
                  border: 'none',
                  padding: '9px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Aplicar Cupón al Carrito
              </button>
            </div>

            {/* Offers Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {INITIAL_OFFERS.map(offer => (
                <div
                  key={offer.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      background: offer.tagBg,
                      color: offer.tagColor
                    }}>
                      {offer.tag}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      color: '#059669',
                      background: '#ecfdf5',
                      padding: '2px 8px',
                      borderRadius: '9999px'
                    }}>
                      {offer.discount}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1c1917', marginBottom: '4px' }}>
                    {offer.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '12px', lineHeight: 1.4 }}>
                    {offer.desc}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#c2410c' }}>
                        ${offer.price.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '6px' }}>
                        ${offer.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => addOfferToCart(offer)}
                      style={{
                        background: '#c2410c',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(194, 65, 12, 0.25)'
                      }}
                    >
                      + Aprovechar Promo
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB 3: ORDENES ================= */}
        {activeTab === 'ordenes' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#1c1917' }}>
                📦 Mis Órdenes en Vivo
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Rastreo interactivo y simulación del estado de tu compra.
              </p>
            </div>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 16px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '3rem' }}>🛍️</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginTop: '10px', color: '#1c1917' }}>
                  Aún no tienes órdenes
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                  Ve al menú, elige tu hamburguesa favorita y simula tu primera compra.
                </p>
                <button
                  onClick={() => setActiveTab('menu')}
                  style={{
                    marginTop: '16px',
                    background: '#c2410c',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Ver Menú de Hamburguesas
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map((order, index) => {
                  const isActive = order.statusStep < 4;
                  return (
                    <div
                      key={order.id}
                      style={{
                        background: '#ffffff',
                        border: isActive ? '2px solid #fed7aa' : '1px solid #e2e8f0',
                        borderRadius: '18px',
                        padding: '18px',
                        boxShadow: isActive ? '0 6px 18px rgba(194, 65, 12, 0.08)' : '0 2px 6px rgba(0,0,0,0.02)'
                      }}
                    >
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div>
                          <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1c1917' }}>
                            {order.id}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '6px' }}>
                            &bull; {order.createdAt}
                          </span>
                        </div>
                        <span style={{
                          fontSize: '0.74rem',
                          fontWeight: '800',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          background: isActive ? '#fff7ed' : '#ecfdf5',
                          color: isActive ? '#c2410c' : '#059669',
                          border: `1px solid ${isActive ? '#fed7aa' : '#a7f3d0'}`
                        }}>
                          {order.statusText}
                        </span>
                      </div>

                      {/* Timeline Stepper for Active Order */}
                      {isActive && (
                        <div style={{
                          background: '#fafaf9',
                          border: '1px solid #f5f5f4',
                          borderRadius: '12px',
                          padding: '12px',
                          marginBottom: '14px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            {['Confirmado 📝', 'Cocina 👨‍🍳', 'En Camino 🛵', 'Entregado ✅'].map((stepName, sIndex) => {
                              const stepNum = sIndex + 1;
                              const isReached = order.statusStep >= stepNum;
                              return (
                                <div key={stepName} style={{ textAlign: 'center', flex: 1 }}>
                                  <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    margin: '0 auto 4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.72rem',
                                    fontWeight: '800',
                                    background: isReached ? '#c2410c' : '#e2e8f0',
                                    color: isReached ? '#ffffff' : '#64748b'
                                  }}>
                                    {stepNum}
                                  </div>
                                  <div style={{ fontSize: '0.62rem', fontWeight: isReached ? '800' : '500', color: isReached ? '#1c1917' : '#94a3b8' }}>
                                    {stepName.split(' ')[0]}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '10px',
                            paddingTop: '8px',
                            borderTop: '1px dashed #e2e8f0'
                          }}>
                            <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                              ⏱️ Tiempo estimado: <strong>{order.estimatedArrival}</strong>
                            </span>
                            <button
                              onClick={() => advanceOrderStatus(order.id)}
                              style={{
                                background: '#1c1917',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '6px',
                                fontSize: '0.72rem',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              Avanzar Estado ⏩
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Order Items Summary */}
                      <div style={{ marginBottom: '10px' }}>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '3px 0' }}>
                            <span style={{ color: '#334155' }}>
                              <strong>{item.quantity}x</strong> {item.name}
                            </span>
                            <span style={{ fontWeight: '700', color: '#1e293b' }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Footer & Re-order */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '10px',
                        borderTop: '1px solid #f1f5f9'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Entrega en: {order.address}</div>
                          <div style={{ fontSize: '1.05rem', fontWeight: '900', color: '#c2410c' }}>
                            Total: ${order.total.toFixed(2)}
                          </div>
                        </div>

                        {!isActive && (
                          <button
                            onClick={() => {
                              order.items.forEach(item => addToCart(item, item.quantity));
                              setIsCartOpen(true);
                            }}
                            style={{
                              background: '#f1f5f9',
                              color: '#1e293b',
                              border: '1px solid #cbd5e1',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '0.78rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            Repetir Pedido 🔄
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 4: PERFIL ================= */}
        {activeTab === 'perfil' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            
            {/* User Profile Card */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              marginBottom: '16px'
            }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '10px' }}>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                  alt="Valentina Restrepo"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #c2410c'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  background: '#f59e0b',
                  color: '#1c1917',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                  👑
                </span>
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1c1917' }}>
                Valentina Restrepo
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                valentina.restrepo@gmail.com
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fef3c7',
                border: '1px solid #fde68a',
                color: '#92400e',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: '800',
                marginTop: '10px'
              }}>
                ⭐ Rapid VIP Gold &bull; 850 Puntos Club
              </div>

              {/* Stats Counters */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                marginTop: '18px',
                paddingTop: '16px',
                borderTop: '1px solid #f1f5f9'
              }}>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#c2410c' }}>
                    {orders.length + 12}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '600' }}>Pedidos</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#b45309' }}>26</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '600' }}>Burgers</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#059669' }}>$242</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '600' }}>Consumo</div>
                </div>
              </div>
            </div>

            {/* Saved Address & Payment */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1c1917', marginBottom: '10px' }}>
                📍 Dirección de Entrega Principal
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#334155' }}>
                <span style={{ fontSize: '1.2rem' }}>🏠</span>
                <div>
                  <div style={{ fontWeight: '700' }}>Casa (Predeterminada)</div>
                  <div style={{ color: '#64748b' }}>Av. Del Libertador 1420, Depto 5B</div>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1c1917', marginTop: '14px', marginBottom: '10px' }}>
                💳 Método de Pago Simulado
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#334155' }}>
                <span style={{ fontSize: '1.2rem' }}>💳</span>
                <div>
                  <div style={{ fontWeight: '700' }}>Visa terminada en 4022</div>
                  <div style={{ color: '#059669', fontWeight: '600' }}>Simulación Activa</div>
                </div>
              </div>
            </div>

            {/* System Navigation Hub */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1c1917', marginBottom: '4px' }}>
                🚀 Ecosistema Comercial
              </div>
              <a
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#1c1917',
                  fontSize: '0.85rem',
                  fontWeight: '700'
                }}
              >
                <span>🌐 Ir a Landing E-commerce</span>
                <span>&rarr;</span>
              </a>
              <a
                href="/admin"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#1c1917',
                  fontSize: '0.85rem',
                  fontWeight: '700'
                }}
              >
                <span>⚙️ Ir a Panel Admin & Métricas</span>
                <span>&rarr;</span>
              </a>
            </div>

          </div>
        )}

      </main>

      {/* Floating Cart Button (when items in cart) */}
      {cart.length > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '72px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: '428px',
            background: 'linear-gradient(135deg, #ea580c, #c2410c)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '14px',
            padding: '14px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 10px 25px rgba(194, 65, 12, 0.4)',
            cursor: 'pointer',
            zIndex: 45
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#ffffff',
              color: '#c2410c',
              borderRadius: '9999px',
              padding: '2px 8px',
              fontSize: '0.82rem',
              fontWeight: '900'
            }}>
              {totalCartCount}
            </span>
            <span style={{ fontWeight: '800', fontSize: '0.95rem' }}>Ver Mi Pedido</span>
          </div>
          <span style={{ fontWeight: '900', fontSize: '1.05rem' }}>${cartTotal.toFixed(2)}</span>
        </button>
      )}

      {/* ================= CART DRAWER / PURCHASE SIMULATOR ================= */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}>
          <div className="slide-up" style={{
            background: '#ffffff',
            width: '100%',
            maxWidth: '460px',
            maxHeight: '90vh',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            boxShadow: '0 -10px 30px rgba(0,0,0,0.15)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1c1917' }}>
                  Simulador de Compra 🍔
                </h3>
                <small style={{ color: '#64748b' }}>Tu orden de Hamburger Rapid</small>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b' }}>
                El carrito está vacío. ¡Elige tus hamburguesas en el Menú!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f8fafc',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1c1917' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#c2410c', fontWeight: '700' }}>
                          ${item.price.toFixed(2)} c/u
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => updateCartQuantity(idx, -1)}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: '800', fontSize: '0.9rem', minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(idx, 1)}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Coupon Field */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Cupón (ej. RAPIDVIP)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem'
                  }}
                />
                <button
                  onClick={applyCoupon}
                  style={{
                    background: '#1c1917',
                    color: 'white',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Aplicar
                </button>
              </div>
              {couponMessage && (
                <small style={{ color: appliedDiscount > 0 ? '#059669' : '#dc2626', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                  {couponMessage}
                </small>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '18px',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#64748b' }}>
                <span>Subtotal:</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#059669', fontWeight: '700' }}>
                  <span>Descuento ({appliedDiscount * 100}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#64748b' }}>
                <span>Envío express:</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#059669' }}>GRATIS</strong> : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid #e2e8f0',
                fontSize: '1.15rem',
                fontWeight: '900',
                color: '#1c1917'
              }}>
                <span>Total a Pagar:</span>
                <span style={{ color: '#c2410c' }}>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Simulate Purchase Button */}
            <button
              onClick={handleSimulatePurchase}
              disabled={cart.length === 0 || isSimulating}
              style={{
                background: cart.length === 0 ? '#94a3b8' : 'linear-gradient(135deg, #ea580c, #c2410c)',
                color: '#ffffff',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '800',
                cursor: cart.length === 0 || isSimulating ? 'not-allowed' : 'pointer',
                boxShadow: cart.length > 0 ? '0 6px 18px rgba(194, 65, 12, 0.35)' : 'none'
              }}
            >
              {isSimulating ? '⏳ Procesando Simulación...' : `🚀 Confirmar y Simular Compra ($${cartTotal.toFixed(2)})`}
            </button>
          </div>
        </div>
      )}

      {/* ================= PURCHASE SUCCESS MODAL ================= */}
      {simulationSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '30px 24px',
            textAlign: 'center',
            maxWidth: '380px',
            width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#1c1917', marginBottom: '8px' }}>
              ¡Compra Simulada con Éxito!
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>
              Tu hamburguesa ha entrado en parrilla. Puedes seguir la preparación y avance del pedido en la pestaña <strong>Ordenes</strong>.
            </p>
            <button
              onClick={() => {
                setSimulationSuccess(false);
                setIsCartOpen(false);
                setActiveTab('ordenes');
              }}
              style={{
                background: '#c2410c',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '800',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Ver Rastreo de Mi Orden 📦
            </button>
          </div>
        </div>
      )}

      {/* ================= BURGER DETAIL / CUSTOMIZE MODAL ================= */}
      {selectedBurger && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 65,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '22px',
            maxWidth: '420px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 20px 30px rgba(0,0,0,0.2)'
          }}>
            <button
              onClick={() => setSelectedBurger(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                fontWeight: '800',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              &times;
            </button>

            <img
              src={selectedBurger.image}
              alt={selectedBurger.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />

            <div style={{ padding: '20px' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: selectedBurger.badgeBg || '#fef3c7',
                color: selectedBurger.badgeColor || '#92400e',
                display: 'inline-block',
                marginBottom: '8px'
              }}>
                {selectedBurger.specialty_badge}
              </span>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#1c1917' }}>
                  {selectedBurger.name}
                </h3>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#c2410c' }}>
                  ${parseFloat(selectedBurger.price).toFixed(2)}
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                {selectedBurger.description}
              </p>

              {/* Meta Chips */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
                <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '600' }}>
                  ⏱️ {selectedBurger.prep_time}
                </span>
                <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '600' }}>
                  🔥 {selectedBurger.calories}
                </span>
                <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '600' }}>
                  ⭐ {selectedBurger.rating}
                </span>
              </div>

              {/* Ingredients */}
              <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#1c1917', marginBottom: '8px' }}>
                Ingredientes de la receta:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {(selectedBurger.ingredients || []).map((ing, i) => (
                  <li key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', color: '#475569' }}>
                    ✓ {ing}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  addToCart(selectedBurger, 1);
                  setSelectedBurger(null);
                  setIsCartOpen(true);
                }}
                style={{
                  width: '100%',
                  background: '#c2410c',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Agregar al Carrito • ${parseFloat(selectedBurger.price).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= BOTTOM NAVIGATION TABS (4 TABS) ================= */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid #e2e8f0',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '8px 0 10px',
        zIndex: 50
      }}>
        {[
          { id: 'menu', label: 'Menú', icon: '🍔' },
          { id: 'ofertas', label: 'Ofertas', icon: '🏷️' },
          { id: 'ordenes', label: 'Ordenes', icon: '📦', badge: orders.filter(o => o.statusStep < 4).length },
          { id: 'perfil', label: 'Perfil', icon: '👤' }
        ].map(tab => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '1.3rem', filter: isSelected ? 'drop-shadow(0 2px 4px rgba(194, 65, 12, 0.3))' : 'grayscale(30%)' }}>
                {tab.icon}
              </span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: isSelected ? '800' : '600',
                color: isSelected ? '#c2410c' : '#64748b'
              }}>
                {tab.label}
              </span>

              {tab.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0px',
                  right: '24px',
                  background: '#c2410c',
                  color: 'white',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '0.62rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

    </div>
  );
}
