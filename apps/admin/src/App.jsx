import React, { useState, useEffect } from 'react';

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especialidades',
    price: 14.99,
    stock: 45,
    specialty_badge: '👑 Corona de Oro • Legendaria',
    specialty_level: 'Legendaria',
    rating: 4.9,
    prep_time: '12 min',
    calories: '920 kcal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
    description: 'Doble carne Angus madurada 180g a la parrilla de roble, cheddar inglés añejo, bourbon y panceta ahumada.',
    totalSold: 184
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas',
    price: 10.99,
    stock: 60,
    specialty_badge: '⭐ Clásica Premium • Signature',
    specialty_level: 'Signature',
    rating: 4.8,
    prep_time: '8 min',
    calories: '740 kcal',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop&q=80',
    description: 'Carne de res seleccionada a las brasas de quebracho, queso americano fundente, pepinillos encurtidos y salsa imperial.',
    totalSold: 86
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Dobles',
    price: 13.50,
    stock: 50,
    specialty_badge: '🔥 Doble Poder • Élite',
    specialty_level: 'Élite',
    rating: 4.9,
    prep_time: '10 min',
    calories: '980 kcal',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80',
    description: 'Doble medallón 300g corte fino asado a fuego vivo, doble Monterey Jack, doble bacon y mayonesa trufada.',
    totalSold: 138
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especialidades',
    price: 14.25,
    stock: 38,
    specialty_badge: '🏆 Creación Exclusiva • Master',
    specialty_level: 'Master',
    rating: 4.9,
    prep_time: '11 min',
    calories: '960 kcal',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&auto=format&fit=crop&q=80',
    description: 'Doble carne smash caramelizada, aros de cebolla crocantes a la cerveza, relish de jalapeños y cuatro quesos.',
    totalSold: 105
  },
  {
    id: 5,
    name: 'Burger Trufa & Portobello',
    category: 'Gourmet',
    price: 15.50,
    stock: 32,
    specialty_badge: '🍄 Gourmet Supreme • Black Label',
    specialty_level: 'Black Label',
    rating: 5.0,
    prep_time: '13 min',
    calories: '830 kcal',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=400&auto=format&fit=crop&q=80',
    description: 'Carne Angus pastoreo, setas Portobello al tomillo, queso Gouda holandés y alioli de trufa negra.',
    totalSold: 64
  },
  {
    id: 6,
    name: 'Burger Smoked BBQ Bacon',
    category: 'Ahumados',
    price: 12.75,
    stock: 44,
    specialty_badge: '🪵 Ahumado Roble • Artesanal',
    specialty_level: 'Artesanal',
    rating: 4.8,
    prep_time: '9 min',
    calories: '860 kcal',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&auto=format&fit=crop&q=80',
    description: 'Medallón ahumado a baja temperatura con mezquite, tocino grueso, Pepper Jack fundido y salsa BBQ de agave.',
    totalSold: 72
  },
  {
    id: 7,
    name: 'Burger Crispy Royal Chicken',
    category: 'Pollo Crispy',
    price: 11.80,
    stock: 40,
    specialty_badge: '🍗 Crunch Dorado • Superior',
    specialty_level: 'Superior',
    rating: 4.7,
    prep_time: '10 min',
    calories: '780 kcal',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&auto=format&fit=crop&q=80',
    description: 'Suprema en buttermilk 24h con 11 hierbas, empanizado ultracrujiente, ensalada coleslaw y honey mustard.',
    totalSold: 58
  },
  {
    id: 8,
    name: 'Burger Spicy Chipotle Fire',
    category: 'Picantes',
    price: 12.90,
    stock: 35,
    specialty_badge: '🌶️ Fuego Bravo • Intenso',
    specialty_level: 'Intenso',
    rating: 4.8,
    prep_time: '9 min',
    calories: '810 kcal',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&auto=format&fit=crop&q=80',
    description: 'Carne Angus picada con sazón cajún, provolone fundido, piña asada al grill, jalapeños y chipotle bravo.',
    totalSold: 49
  },
  {
    id: 9,
    name: 'Burger Guacamole & Queso Fundido',
    category: 'Especialidades',
    price: 13.20,
    stock: 36,
    specialty_badge: '🥑 Frescura Viva • Selección',
    specialty_level: 'Selección',
    rating: 4.7,
    prep_time: '10 min',
    calories: '840 kcal',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80',
    description: 'Carne a la plancha, abundante guacamole fresco con aguacate Hass, pico de gallo campesino y totopos de maíz azul.',
    totalSold: 51
  },
  {
    id: 10,
    name: 'Burger Smash Monster Cuádruple',
    category: 'Dobles',
    price: 16.90,
    stock: 25,
    specialty_badge: '⚡ Monster Legend • Colosal',
    specialty_level: 'Colosal',
    rating: 4.9,
    prep_time: '14 min',
    calories: '1180 kcal',
    image: 'https://images.unsplash.com/photo-1583032015879-166c42959885?w=400&auto=format&fit=crop&q=80',
    description: 'Cuatro medallones smash ultrafinos (400g carne total), cuatro capas de queso cheddar y salsa secreta Rapid XL.',
    totalSold: 83
  }
];

const FALLBACK_CONSUMERS = [
  {
    id: 'CUST-01',
    name: 'Valentina Restrepo',
    email: 'valentina.restrepo@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    tier: 'VIP Diamante',
    tierBadge: '👑 Diamante',
    totalOrders: 38,
    totalSpent: 542.80,
    burgersConsumed: 64,
    favoriteBurger: 'Rey de las Burgers',
    lastOrderDate: 'Hace 2 horas',
    segment: 'Consumidor Frecuente',
    monthlyFrequency: '5.2 pedidos/mes'
  },
  {
    id: 'CUST-02',
    name: 'Alejandro Morales',
    email: 'a.morales.tech@corp.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    tier: 'VIP Platino',
    tierBadge: '⭐ Platino',
    totalOrders: 29,
    totalSpent: 435.50,
    burgersConsumed: 52,
    favoriteBurger: 'Burger Real Doble',
    lastOrderDate: 'Ayer',
    segment: 'Corporativo / Almuerzo',
    monthlyFrequency: '4.1 pedidos/mes'
  },
  {
    id: 'CUST-03',
    name: 'Camila Villalobos',
    email: 'camilav@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    tier: 'VIP Oro',
    tierBadge: '🥇 Oro',
    totalOrders: 22,
    totalSpent: 328.70,
    burgersConsumed: 36,
    favoriteBurger: 'Burger Doble Especial',
    lastOrderDate: 'Hace 3 días',
    segment: 'Gourmet Lover',
    monthlyFrequency: '3.4 pedidos/mes'
  },
  {
    id: 'CUST-04',
    name: 'Santiago Navarro',
    email: 'santiago.nav@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    tier: 'VIP Oro',
    tierBadge: '🥇 Oro',
    totalOrders: 18,
    totalSpent: 265.40,
    burgersConsumed: 29,
    favoriteBurger: 'Burger Trufa & Portobello',
    lastOrderDate: 'Hace 4 días',
    segment: 'Gourmet Lover',
    monthlyFrequency: '2.8 pedidos/mes'
  },
  {
    id: 'CUST-05',
    name: 'Mariana Duarte',
    email: 'mariana.d@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    tier: 'Club Silver',
    tierBadge: '🥈 Silver',
    totalOrders: 14,
    totalSpent: 198.20,
    burgersConsumed: 21,
    favoriteBurger: 'Burger Real Clásica',
    lastOrderDate: 'Hace 1 semana',
    segment: 'Familiar Fin de Semana',
    monthlyFrequency: '2.1 pedidos/mes'
  },
  {
    id: 'CUST-06',
    name: 'Mateo Cárdenas',
    email: 'mateo.cardenas@live.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    tier: 'Club Silver',
    tierBadge: '🥈 Silver',
    totalOrders: 11,
    totalSpent: 162.90,
    burgersConsumed: 18,
    favoriteBurger: 'Burger Smash Monster Cuádruple',
    lastOrderDate: 'Hace 1 semana',
    segment: 'Consumidor Joven',
    monthlyFrequency: '1.9 pedidos/mes'
  },
  {
    id: 'CUST-07',
    name: 'Lucía Fernández',
    email: 'lucia.fdz@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tier: 'Nuevo Miembro',
    tierBadge: '🌱 Nuevo',
    totalOrders: 5,
    totalSpent: 74.50,
    burgersConsumed: 8,
    favoriteBurger: 'Burger Crispy Royal Chicken',
    lastOrderDate: 'Hace 2 semanas',
    segment: 'Nuevo Cliente',
    monthlyFrequency: '1.2 pedidos/mes'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // overview | burgers | consumers | database
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [consumers, setConsumers] = useState(FALLBACK_CONSUMERS);
  const [orders, setOrders] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPing, setLastPing] = useState(null);

  // Filters & Modals
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [consumerSearch, setConsumerSearch] = useState('');
  const [selectedBurger, setSelectedBurger] = useState(null);
  const [isNewBurgerOpen, setIsNewBurgerOpen] = useState(false);
  const [newBurgerData, setNewBurgerData] = useState({
    name: '',
    category: 'Especialidades',
    price: 13.99,
    stock: 40,
    specialty_badge: '✨ Nueva Creación Gourmet',
    description: '',
    prep_time: '10 min',
    calories: '850 kcal'
  });

  const fetchData = async () => {
    setIsLoading(true);
    const pingStart = Date.now();

    try {
      const [resHealth, resProducts, resConsumers, resOrders] = await Promise.all([
        fetch('/api/health').then(r => r.json()).catch(() => null),
        fetch('/api/products').then(r => r.json()).catch(() => null),
        fetch('/api/metrics/consumers').then(r => r.json()).catch(() => null),
        fetch('/api/orders').then(r => r.json()).catch(() => null)
      ]);

      const pingDuration = Date.now() - pingStart;
      setLastPing(`${pingDuration} ms`);

      if (resHealth) setDbStatus(resHealth.database);
      if (resProducts && resProducts.data && resProducts.data.length > 0) {
        setProducts(resProducts.data);
      }
      if (resConsumers && resConsumers.data) {
        if (resConsumers.data.topConsumers) setConsumers(resConsumers.data.topConsumers);
      }
      if (resOrders && resOrders.data) {
        setOrders(resOrders.data);
      }
    } catch (e) {
      console.log('Error cargando API, usando almacenamiento local persistente');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateBurger = async (e) => {
    e.preventDefault();
    if (!newBurgerData.name) return;

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBurgerData)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setProducts(prev => [data.data, ...prev]);
      } else {
        setProducts(prev => [{ id: Date.now(), ...newBurgerData, totalSold: 0 }, ...prev]);
      }
    } catch (err) {
      setProducts(prev => [{ id: Date.now(), ...newBurgerData, totalSold: 0 }, ...prev]);
    }

    setIsNewBurgerOpen(false);
    setNewBurgerData({
      name: '',
      category: 'Especialidades',
      price: 13.99,
      stock: 40,
      specialty_badge: '✨ Nueva Creación Gourmet',
      description: '',
      prep_time: '10 min',
      calories: '850 kcal'
    });
  };

  // Metrics Calculations
  const totalConsumersCount = consumers.length;
  const totalBurgersConsumed = consumers.reduce((sum, c) => sum + (c.burgersConsumed || 0), 0);
  const totalRevenue = consumers.reduce((sum, c) => sum + (parseFloat(c.totalSpent) || 0), 0);
  const totalOrdersCount = consumers.reduce((sum, c) => sum + (c.totalOrders || 0), 0);
  const avgTicket = totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount).toFixed(2) : '18.50';

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesCat = categoryFilter === 'all' || p.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          (p.specialty_badge && p.specialty_badge.toLowerCase().includes(productSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Filtered Consumers
  const filteredConsumers = consumers.filter(c => {
    return c.name.toLowerCase().includes(consumerSearch.toLowerCase()) ||
           c.email.toLowerCase().includes(consumerSearch.toLowerCase()) ||
           c.favoriteBurger.toLowerCase().includes(consumerSearch.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      
      {/* Top Header Navbar */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '14px 28px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ffedd5, #fef3c7)',
              border: '1px solid #fed7aa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              boxShadow: '0 2px 6px rgba(194, 65, 12, 0.1)'
            }}>
              🍔
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#1c1917', lineHeight: 1.1 }}>
                Hamburger <span style={{ color: '#c2410c' }}>Rapid</span> Admin
              </div>
              <small style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
                Dashboard Ejecutivo &bull; Métricas de Consumo & Base de Datos
              </small>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
            {[
              { id: 'overview', label: '📊 Visión General', icon: '📈' },
              { id: 'burgers', label: `🍔 Hamburguesas (${products.length})`, icon: '🍔' },
              { id: 'consumers', label: `👥 Consumidores (${consumers.length})`, icon: '👥' },
              { id: 'database', label: '🗄️ Estado Base de Datos', icon: '🗄️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? '#ffffff' : 'transparent',
                  color: activeTab === tab.id ? '#c2410c' : '#64748b',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '9px',
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Quick Actions & Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '0.75rem',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontWeight: '700',
              background: dbStatus?.connected ? '#ecfdf5' : '#fffbeb',
              color: dbStatus?.connected ? '#047857' : '#b45309',
              border: `1px solid ${dbStatus?.connected ? '#a7f3d0' : '#fde68a'}`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: dbStatus?.connected ? '#10b981' : '#f59e0b'
              }}></span>
              {dbStatus?.mode === 'mysql' ? 'MySQL Live' : 'In-Memory Engine'}
            </span>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                color: '#334155',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              🌐 E-commerce
            </a>

            <a
              href="/app"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                background: '#c2410c',
                color: '#ffffff',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(194, 65, 12, 0.25)'
              }}
            >
              📱 PWA Mobile
            </a>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '24px 28px', flex: 1 }}>
        
        {/* Top Metric KPI Cards Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '18px',
          marginBottom: '28px'
        }}>
          {/* Card 1 */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                Variantes Activas
              </span>
              <span style={{ fontSize: '1.4rem' }}>🍔</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#1c1917', lineHeight: 1 }}>
              {products.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '700', marginTop: '6px' }}>
              ✓ 100% disponibles para la venta
            </div>
          </div>

          {/* Card 2 */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                Consumidores Registrados
              </span>
              <span style={{ fontSize: '1.4rem' }}>👥</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#1c1917', lineHeight: 1 }}>
              {totalConsumersCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#c2410c', fontWeight: '700', marginTop: '6px' }}>
              ⭐ {consumers.filter(c => c.tier.includes('VIP')).length} Clientes VIP Premium
            </div>
          </div>

          {/* Card 3 */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                Burgers Consumidas
              </span>
              <span style={{ fontSize: '1.4rem' }}>🔥</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#c2410c', lineHeight: 1 }}>
              {totalBurgersConsumed} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: '600' }}>unidades</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
              Top: <strong>Rey de las Burgers</strong> (32%)
            </div>
          </div>

          {/* Card 4 */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                Facturación / Ticket Promedio
              </span>
              <span style={{ fontSize: '1.4rem' }}>💳</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#047857', lineHeight: 1 }}>
              ${totalRevenue.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
              Ticket Promedio: <strong>${avgTicket}</strong> por orden
            </div>
          </div>
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
              
              {/* Consumption Breakdown by Variant */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1c1917' }}>
                      🍔 Cuota de Consumo por Hamburguesa
                    </h3>
                    <small style={{ color: '#64748b' }}>Volumen preferido por los consumidores en pedidos recientes</small>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#c2410c', background: '#fff7ed', padding: '4px 10px', borderRadius: '8px' }}>
                    Top 5 Estrellas
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { name: 'Rey de las Burgers', pct: 32, count: 184, color: '#c2410c', badge: '👑 Legendaria' },
                    { name: 'Burger Real Doble', pct: 24, count: 138, color: '#ea580c', badge: '🔥 Élite' },
                    { name: 'Burger Doble Especial', pct: 18, count: 105, color: '#f59e0b', badge: '🏆 Master' },
                    { name: 'Burger Real Clásica', pct: 15, count: 86, color: '#2563eb', badge: '⭐ Signature' },
                    { name: 'Burger Trufa & Portobello y otras', pct: 11, count: 64, color: '#7c3aed', badge: '🍄 Gourmet' }
                  ].map(b => (
                    <div key={b.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '700', color: '#1e293b' }}>
                          {b.name} <small style={{ color: '#64748b', fontWeight: '500' }}>({b.badge})</small>
                        </span>
                        <span style={{ fontWeight: '800', color: '#334155' }}>
                          {b.count} uds &bull; <strong>{b.pct}%</strong>
                        </span>
                      </div>
                      <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${b.pct}%`,
                          height: '100%',
                          background: b.color,
                          borderRadius: '9999px'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database Quick Health Card */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1c1917' }}>
                      🗄️ Estado de la Base de Datos
                    </h3>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      background: '#ecfdf5',
                      color: '#047857'
                    }}>
                      Operativo
                    </span>
                  </div>

                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                      Modo de Ejecución Actual
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '900', color: dbStatus?.connected ? '#059669' : '#b45309', marginTop: '4px' }}>
                      {dbStatus?.mode === 'mysql' ? '🐬 Conectado a MySQL Server' : '⚡ Almacenamiento In-Memory de Ultra Alta Velocidad'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px' }}>
                      Host: <code>{dbStatus?.host || 'in-memory-storage'}</code> &bull; Base de Datos: <code>{dbStatus?.database || 'hamburger_rapid_db'}</code>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <small style={{ color: '#64748b' }}>Latencia API Ping</small>
                      <div style={{ fontWeight: '800', fontSize: '1rem', color: '#1c1917' }}>{lastPing || '< 5ms'}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <small style={{ color: '#64748b' }}>Registros products</small>
                      <div style={{ fontWeight: '800', fontSize: '1rem', color: '#1c1917' }}>{products.length} tablas</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                  <button
                    onClick={fetchData}
                    style={{
                      flex: 1,
                      background: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      padding: '10px',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Refrescar Conexión
                  </button>
                  <button
                    onClick={() => setActiveTab('database')}
                    style={{
                      flex: 1,
                      background: '#1c1917',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Ver Diagnóstico DB
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Preview: Top Consumers & Top Burgers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              
              {/* Top Consumers Quick View */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1c1917' }}>
                    👑 Consumidores Más Frecuentes
                  </h3>
                  <button
                    onClick={() => setActiveTab('consumers')}
                    style={{ background: 'none', border: 'none', color: '#c2410c', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Ver todos ({consumers.length}) &rarr;
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {consumers.slice(0, 4).map(c => (
                    <div
                      key={c.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={c.avatar}
                          alt={c.name}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#1c1917' }}>
                            {c.name}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                            Favorita: <strong style={{ color: '#c2410c' }}>{c.favoriteBurger}</strong>
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '900', color: '#047857', fontSize: '0.95rem' }}>
                          ${c.totalSpent.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          {c.burgersConsumed} burgers
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Burgers Quick View */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1c1917' }}>
                    ⭐ Variantes Destacadas de la Colección
                  </h3>
                  <button
                    onClick={() => setActiveTab('burgers')}
                    style={{ background: 'none', border: 'none', color: '#c2410c', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Ver catálogo completo &rarr;
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {products.slice(0, 4).map(p => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#1c1917' }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#b45309', fontWeight: '700' }}>
                            {p.specialty_badge}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '900', color: '#c2410c', fontSize: '1rem' }}>
                          ${parseFloat(p.price).toFixed(2)}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600' }}>
                          Stock: {p.stock} uds
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 2: BURGERS CATALOG ================= */}
        {activeTab === 'burgers' && (
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            
            {/* Top Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#1c1917' }}>
                  🍔 Catálogo de Hamburguesas Disponibles
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Listado oficial de variantes de Hamburger Rapid con precios, badges y disponibilidad.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Buscar por nombre o badge..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    width: '260px'
                  }}
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    background: '#ffffff'
                  }}
                >
                  <option value="all">Todas las Categorías</option>
                  <option value="especial">Especialidades</option>
                  <option value="clasica">Clásicas</option>
                  <option value="doble">Dobles & Smash</option>
                  <option value="gourmet">Gourmet</option>
                  <option value="pollo">Pollo Crispy</option>
                  <option value="ahumad">Ahumados</option>
                </select>

                <button
                  onClick={() => setIsNewBurgerOpen(true)}
                  style={{
                    background: '#c2410c',
                    color: 'white',
                    border: 'none',
                    padding: '9px 16px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(194, 65, 12, 0.25)'
                  }}
                >
                  + Agregar Hamburguesa
                </button>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Foto & Nombre</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Badge Nivel de Especialidad</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Categoría</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Precio</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Stock</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Prep / Calorías</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800', textAlign: 'center' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p, idx) => (
                    <tr
                      key={p.id || idx}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fafaf9'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Photo & Name */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: '800', color: '#1c1917', fontSize: '0.94rem' }}>
                              {p.name}
                            </div>
                            <small style={{ color: '#64748b', fontSize: '0.74rem' }}>ID: #{p.id}</small>
                          </div>
                        </div>
                      </td>

                      {/* Badge Nivel Especialidad */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          background: '#fef3c7',
                          color: '#92400e',
                          border: '1px solid #fde68a'
                        }}>
                          {p.specialty_badge || '⭐ Especialidad de la Casa'}
                        </span>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          background: '#f1f5f9',
                          color: '#475569',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: '900', color: '#c2410c' }}>
                          ${parseFloat(p.price).toFixed(2)}
                        </span>
                      </td>

                      {/* Stock */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontWeight: '700',
                          color: p.stock > 15 ? '#059669' : '#b45309',
                          fontSize: '0.84rem'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.stock > 15 ? '#10b981' : '#f59e0b' }}></span>
                          {p.stock} unidades
                        </span>
                      </td>

                      {/* Prep / Calories */}
                      <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '0.8rem' }}>
                        <div>⏱️ {p.prep_time || '10 min'}</div>
                        <div>🔥 {p.calories || '850 kcal'}</div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <button
                          onClick={() => setSelectedBurger(p)}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            color: '#1e293b',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          Ver Ficha
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ================= TAB 3: CONSUMERS METRICS ================= */}
        {activeTab === 'consumers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Consumer Insights Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Segmentación de Clientes
                </span>
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>👑 VIP Diamante & Platino:</span>
                    <strong>2 clientes (28%)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>⭐ VIP Oro & Silver:</span>
                    <strong>4 clientes (57%)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>🌱 Nuevos Registros:</span>
                    <strong>1 cliente (15%)</strong>
                  </div>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Frecuencia de Compra
                </span>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#c2410c', marginTop: '4px' }}>
                  3.4 <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>pedidos/mes</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#059669', marginTop: '6px' }}>
                  ↑ 18% incremento en fidelización mediante PWA
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Hamburguesa Favorita de Clientes VIP
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#1c1917', marginTop: '6px' }}>
                  Rey de las Burgers
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                  64% de los clientes VIP la eligen como primera opción.
                </p>
              </div>
            </div>

            {/* Consumers Table */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#1c1917' }}>
                    👥 Métricas de Consumidores / Clientes según Consumo
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                    Clasificación en tiempo real por volumen de hamburguesas degustadas y gasto acumulado.
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Buscar consumidor o hamburguesa..."
                  value={consumerSearch}
                  onChange={(e) => setConsumerSearch(e.target.value)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    width: '280px'
                  }}
                />
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '12px 16px', fontWeight: '800' }}>Consumidor / Cliente</th>
                      <th style={{ padding: '12px 16px', fontWeight: '800' }}>Nivel de Membresía</th>
                      <th style={{ padding: '12px 16px', fontWeight: '800' }}>Hamburguesas Consumidas</th>
                      <th style={{ padding: '12px 16px', fontWeight: '800' }}>Total Invertido</th>
                      <th style={{ padding: '12px 16px', fontWeight: '800' }}>Hamburguesa Favorita</th>
                      <th style={{ padding: '12px 16px', fontWeight: '800' }}>Frecuencia de Compra</th>
                      <th style={{ padding: '12px 16px', fontWeight: '800' }}>Último Consumo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConsumers.map((c, i) => (
                      <tr
                        key={c.id || i}
                        style={{ borderBottom: '1px solid #f1f5f9' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#fafaf9'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        {/* Name & Avatar */}
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                              src={c.avatar}
                              alt={c.name}
                              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: '800', color: '#1c1917', fontSize: '0.94rem' }}>
                                {c.name}
                              </div>
                              <small style={{ color: '#64748b' }}>{c.email}</small>
                            </div>
                          </div>
                        </td>

                        {/* Tier */}
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            background: c.tier.includes('Diamante') ? '#fef3c7' : c.tier.includes('Platino') ? '#eff6ff' : '#f8fafc',
                            color: c.tier.includes('Diamante') ? '#92400e' : c.tier.includes('Platino') ? '#1e40af' : '#475569',
                            border: '1px solid #e2e8f0'
                          }}>
                            {c.tier}
                          </span>
                        </td>

                        {/* Burgers Consumed with Progress Bar */}
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong style={{ fontSize: '1rem', color: '#c2410c' }}>{c.burgersConsumed}</strong>
                            <div style={{ width: '80px', height: '6px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                              <div style={{
                                width: `${Math.min(100, (c.burgersConsumed / 70) * 100)}%`,
                                height: '100%',
                                background: '#c2410c'
                              }}></div>
                            </div>
                          </div>
                        </td>

                        {/* Total Spent */}
                        <td style={{ padding: '14px 16px' }}>
                          <strong style={{ fontSize: '1rem', color: '#047857' }}>
                            ${parseFloat(c.totalSpent).toFixed(2)}
                          </strong>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.totalOrders} pedidos</div>
                        </td>

                        {/* Favorite Burger */}
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontWeight: '700', color: '#1c1917' }}>
                            {c.favoriteBurger}
                          </span>
                        </td>

                        {/* Frequency */}
                        <td style={{ padding: '14px 16px', color: '#64748b' }}>
                          {c.monthlyFrequency}
                        </td>

                        {/* Last Order */}
                        <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '0.8rem' }}>
                          {c.lastOrderDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 4: DATABASE STATUS ================= */}
        {activeTab === 'database' && (
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#1c1917' }}>
                  🗄️ Monitor de Base de Datos & Infraestructura
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Telemetría en tiempo real del motor de datos de Hamburger Rapid.
                </p>
              </div>

              <button
                onClick={fetchData}
                style={{
                  background: '#c2410c',
                  color: 'white',
                  border: 'none',
                  padding: '9px 18px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Probar Conexión Ahora ⚡
              </button>
            </div>

            {/* Status Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginBottom: '24px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Estado de Conexión
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: dbStatus?.connected ? '#047857' : '#b45309', marginTop: '4px' }}>
                  {dbStatus?.connected ? '🟢 Conexión Activa y Estable' : '🟡 In-Memory Modo Rápido Activo'}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                  Modo: <strong>{dbStatus?.mode || 'in-memory'}</strong>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Nombre de la Base de Datos
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#1c1917', marginTop: '4px' }}>
                  {dbStatus?.database || 'hamburger_rapid_db'}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                  Usuario: <code>{dbStatus?.user || 'rapid_admin'}</code>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Host del Servidor
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#1c1917', marginTop: '4px' }}>
                  {dbStatus?.host || 'localhost / In-Memory'}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: '700', marginTop: '4px' }}>
                  Latencia de red: {lastPing || '< 5ms'}
                </div>
              </div>
            </div>

            {/* JSON Diagnostic Panel */}
            <div style={{ background: '#0f172a', borderRadius: '14px', padding: '18px', color: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8' }}>
                  Payload de Telemetría (/api/health)
                </span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '6px' }}>
                  JSON RAW
                </span>
              </div>
              <pre style={{ fontSize: '0.82rem', fontFamily: 'monospace', overflowX: 'auto', color: '#38bdf8' }}>
                {JSON.stringify({
                  brand: 'Hamburger Rapid',
                  timestamp: new Date().toISOString(),
                  uptime: 'Operativo',
                  database: dbStatus || {
                    mode: 'in-memory',
                    connected: false,
                    host: 'in-memory-storage',
                    database: 'hamburger_rapid_db',
                    totalProducts: products.length,
                    totalConsumers: consumers.length
                  }
                }, null, 2)}
              </pre>
            </div>

          </div>
        )}

      </main>

      {/* Burger Detail Inspection Modal */}
      {selectedBurger && (
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
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '520px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative'
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
              style={{ width: '100%', height: '220px', objectFit: 'cover' }}
            />

            <div style={{ padding: '24px' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fde68a',
                display: 'inline-block',
                marginBottom: '8px'
              }}>
                {selectedBurger.specialty_badge}
              </span>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#1c1917' }}>
                  {selectedBurger.name}
                </h3>
                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#c2410c' }}>
                  ${parseFloat(selectedBurger.price).toFixed(2)}
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                {selectedBurger.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: '12px', marginBottom: '18px' }}>
                <div>
                  <small style={{ color: '#64748b' }}>Stock</small>
                  <div style={{ fontWeight: '800', color: '#1c1917' }}>{selectedBurger.stock} uds</div>
                </div>
                <div>
                  <small style={{ color: '#64748b' }}>Tiempo Prep</small>
                  <div style={{ fontWeight: '800', color: '#1c1917' }}>{selectedBurger.prep_time}</div>
                </div>
                <div>
                  <small style={{ color: '#64748b' }}>Calorías</small>
                  <div style={{ fontWeight: '800', color: '#1c1917' }}>{selectedBurger.calories}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedBurger(null)}
                style={{
                  width: '100%',
                  background: '#1c1917',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Burger Modal */}
      {isNewBurgerOpen && (
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
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '480px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#1c1917', marginBottom: '14px' }}>
              🍔 Agregar Nueva Hamburguesa
            </h3>

            <form onSubmit={handleCreateBurger} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Nombre de la Hamburguesa:
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Burger Imperial BBQ"
                  value={newBurgerData.name}
                  onChange={(e) => setNewBurgerData({ ...newBurgerData, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Precio ($):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newBurgerData.price}
                    onChange={(e) => setNewBurgerData({ ...newBurgerData, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Stock Inicial:
                  </label>
                  <input
                    type="number"
                    required
                    value={newBurgerData.stock}
                    onChange={(e) => setNewBurgerData({ ...newBurgerData, stock: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Badge Nivel de Especialidad:
                </label>
                <input
                  type="text"
                  placeholder="ej. 👑 Corona de Oro • Legendaria"
                  value={newBurgerData.specialty_badge}
                  onChange={(e) => setNewBurgerData({ ...newBurgerData, specialty_badge: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Descripción de Ingredientes:
                </label>
                <textarea
                  rows="2"
                  placeholder="Detalla los cortes de carne, queso y aderezos..."
                  value={newBurgerData.description}
                  onChange={(e) => setNewBurgerData({ ...newBurgerData, description: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsNewBurgerOpen(false)}
                  style={{
                    flex: 1,
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    padding: '10px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: '#c2410c',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Guardar Hamburguesa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '16px 28px',
        textAlign: 'center',
        fontSize: '0.82rem',
        color: '#64748b'
      }}>
        © 2026 <strong>Hamburger Rapid Enterprise</strong> &bull; Panel de Control & Métricas de Consumo
      </footer>

    </div>
  );
}
