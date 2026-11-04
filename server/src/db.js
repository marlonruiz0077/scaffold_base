const mysql = require('mysql2/promise');

const INITIAL_PRODUCTS = [
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
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
    description: 'Doble carne Angus madurada 180g a la parrilla de roble, queso cheddar inglés añejado, cebolla caramelizada al bourbon de Kentucky y crujiente panceta ahumada.',
    ingredients: ['Doble Carne Angus 180g', 'Cheddar Inglés Añejo', 'Bacon Crujiente', 'Cebolla al Bourbon', 'Pan Brioche Mantequilla']
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
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700&auto=format&fit=crop&q=80',
    description: 'Carne de res seleccionada a las brasas de quebracho, queso americano fundente, pepinillos encurtidos artesanalmente, tomate de temporada, lechuga romana y aderezo imperial Rapid.',
    ingredients: ['Carne Res Selecta 180g', 'Queso Americano', 'Pepinillos Dulces', 'Tomate & Lechuga', 'Salsa Imperial Rapid']
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
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&auto=format&fit=crop&q=80',
    description: 'Doble medallón de res 100% corte fino (300g total) asado a fuego vivo, doble queso Monterey Jack, doble capa de bacon ahumado con madera de manzano y mayonesa trufada.',
    ingredients: ['Doble Medallón 300g', 'Doble Monterey Jack', 'Bacon Ahumado Manzano', 'Cebolla Morada', 'Mayo Trufada']
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
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&auto=format&fit=crop&q=80',
    description: 'Doble carne smash caramelizada con costra crujiente de alta temperatura, aros de cebolla crocantes a la cerveza rubia, relish de jalapeños dulces y cremosa salsa de cuatro quesos.',
    ingredients: ['Doble Smash Caramelizado', 'Aros de Cebolla Rebozados', 'Relish Jalapeño Suave', 'Salsa 4 Quesos', 'Pan de Papa Dorado']
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
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?w=700&auto=format&fit=crop&q=80',
    description: 'Carne Angus premium de pastoreo, láminas de setas Portobello glaseadas al tomillo fresco, queso Gouda holandés madurado y alioli de trufa de verano sobre brioche artesanal.',
    ingredients: ['Carne Angus Pastoreo', 'Portobello al Tomillo', 'Queso Gouda Holandés', 'Alioli de Trufa Negra', 'Rúcula Selvática']
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
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=700&auto=format&fit=crop&q=80',
    description: 'Medallón ahumado a baja temperatura con leña de mezquite, tocino grueso crujiente, queso Pepper Jack fundido, cebolla crispy y barbacoa casera con toque de miel de agave.',
    ingredients: ['Carne Ahumada Mezquite', 'Tocino Grueso de Granja', 'Pepper Jack Fundente', 'Cebolla Crispy', 'BBQ Casera con Agave']
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
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=700&auto=format&fit=crop&q=80',
    description: 'Suprema de pechuga marinada 24h en buttermilk y mix de 11 especias secretas, empanizado ultracrujiente dorado, ensalada coleslaw fresca de col morada y emulsión honey mustard.',
    ingredients: ['Pechuga Buttermilk 24h', 'Empanizado Crujiente 11 Especias', 'Coleslaw Morada Fresca', 'Honey Mustard Artesanal', 'Pepinillos Dulces']
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
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=700&auto=format&fit=crop&q=80',
    description: 'Carne Angus picada a cuchillo con sazón cajún, queso provolone ahumado, rodajas de piña asada al grill caramelizada, jalapeños al escabeche y aderezo bravo de chipotle cremoso.',
    ingredients: ['Carne Angus Sazón Cajún', 'Provolone Ahumado', 'Piña Asada al Grill', 'Jalapeños Escabechados', 'Chipotle Cream Bravo']
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
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&auto=format&fit=crop&q=80',
    description: 'Carne de res a la plancha cubierta con abundante guacamole artesanal con aguacate Hass, pico de gallo campesino fresco, crocantes totopos de maíz azul y suave queso fundido.',
    ingredients: ['Carne Res Grill', 'Guacamole Fresco Hass', 'Pico de Gallo Cítrico', 'Totopos Maíz Azul', 'Queso Oaxaca Fundente']
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
    image: 'https://images.unsplash.com/photo-1583032015879-166c42959885?w=700&auto=format&fit=crop&q=80',
    description: 'Cuatro patties smash ultrafinos de máxima caramelización (400g carne total), cuatro lonchas de queso cheddar derretido entre cada capa, pepinillos en juliana y salsa secreta Rapid XL.',
    ingredients: ['4 Medallones Smash (400g)', '4 Capas Cheddar Fundido', 'Pepinillos en Juliana', 'Cebolla Picada Fina', 'Salsa Secreta Rapid XL']
  }
];

const INITIAL_CONSUMERS = [
  {
    id: 'CUST-01',
    name: 'Valentina Restrepo',
    email: 'valentina.restrepo@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    tier: 'VIP Diamante',
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
    totalOrders: 5,
    totalSpent: 74.50,
    burgersConsumed: 8,
    favoriteBurger: 'Burger Crispy Royal Chicken',
    lastOrderDate: 'Hace 2 semanas',
    segment: 'Nuevo Cliente',
    monthlyFrequency: '1.2 pedidos/mes'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-7821',
    customerName: 'Valentina Restrepo',
    items: [
      { id: 1, name: 'Rey de las Burgers', quantity: 2, price: 14.99 },
      { id: 3, name: 'Burger Real Doble', quantity: 1, price: 13.50 }
    ],
    total: 43.48,
    status: 'en_preparacion',
    statusLabel: 'En Cocina 👨‍🍳',
    address: 'Av. Del Libertador 1420, Depto 5B',
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    estimatedTime: '15-20 min'
  },
  {
    id: 'ORD-7820',
    customerName: 'Alejandro Morales',
    items: [
      { id: 4, name: 'Burger Doble Especial', quantity: 1, price: 14.25 },
      { id: 2, name: 'Burger Real Clásica', quantity: 1, price: 10.99 }
    ],
    total: 25.24,
    status: 'en_camino',
    statusLabel: 'En Camino con Repartidor 🛵',
    address: 'Paseo de la Reforma 250, Piso 12',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    estimatedTime: '5-10 min'
  },
  {
    id: 'ORD-7819',
    customerName: 'Santiago Navarro',
    items: [
      { id: 5, name: 'Burger Trufa & Portobello', quantity: 2, price: 15.50 }
    ],
    total: 31.00,
    status: 'entregado',
    statusLabel: 'Entregado con Éxito ✅',
    address: 'Calle Los Sauces 432',
    createdAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    estimatedTime: 'Completado'
  }
];

let inMemoryProducts = [...INITIAL_PRODUCTS];
let inMemoryConsumers = [...INITIAL_CONSUMERS];
let inMemoryOrders = [...INITIAL_ORDERS];
let pool = null;
let isConnectedToMySQL = false;
let lastDbError = null;

async function initDB() {
  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const user = process.env.DB_USER || process.env.MYSQL_USER || 'root';
  const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
  const database = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'demo';
  const port = parseInt(process.env.DB_PORT || '3306', 10);

  if (!databaseUrl && !host) {
    lastDbError = 'Variables DB_HOST ni DATABASE_URL configuradas en el entorno.';
    console.log(`ℹ️ [DB] ${lastDbError} Operando en modo In-Memory para Hamburger Rapid.`);
    return;
  }

  try {
    if (databaseUrl) {
      console.log(`🔄 [DB] Intentando conectar a MySQL vía DATABASE_URL...`);
      pool = mysql.createPool(databaseUrl);
    } else {
      console.log(`🔄 [DB] Intentando conectar a MySQL en ${host}:${port}...`);
      pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 8000
      });
    }

    const connection = await pool.getConnection();
    console.log(`✅ [DB] Conectado exitosamente a MySQL (${host || 'URL'} - BD: ${database})`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        specialty_badge VARCHAR(255),
        specialty_level VARCHAR(100),
        rating DECIMAL(3,1) DEFAULT 4.8,
        prep_time VARCHAR(50),
        calories VARCHAR(50),
        image VARCHAR(500),
        description TEXT,
        ingredients JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('🌱 [DB] Inicializando catálogo de Hamburger Rapid (10 variantes)...');
      for (const p of INITIAL_PRODUCTS) {
        await connection.query(
          'INSERT INTO products (name, category, price, stock, specialty_badge, specialty_level, rating, prep_time, calories, image, description, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            p.name,
            p.category,
            p.price,
            p.stock,
            p.specialty_badge,
            p.specialty_level,
            p.rating,
            p.prep_time,
            p.calories,
            p.image,
            p.description,
            JSON.stringify(p.ingredients)
          ]
        );
      }
    }

    connection.release();
    isConnectedToMySQL = true;
    lastDbError = null;
  } catch (error) {
    lastDbError = error.message;
    console.warn(`⚠️ [DB] No se pudo conectar a MySQL: ${error.message}. Operando en modo In-Memory.`);
    isConnectedToMySQL = false;
  }
}

async function getProducts() {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC');
      return rows.map(r => ({
        ...r,
        ingredients: typeof r.ingredients === 'string' ? JSON.parse(r.ingredients) : (r.ingredients || [])
      }));
    } catch (err) {
      console.error('Error consultando MySQL, recurriendo a memoria temporal:', err.message);
      lastDbError = err.message;
    }
  }
  return inMemoryProducts;
}

async function addProduct(prod) {
  const newProduct = {
    id: Date.now(),
    name: prod.name,
    category: prod.category || 'Especialidades',
    price: parseFloat(prod.price) || 0,
    stock: parseInt(prod.stock, 10) || 0,
    specialty_badge: prod.specialty_badge || '✨ Nueva Creación',
    specialty_level: prod.specialty_level || 'Especial',
    rating: parseFloat(prod.rating) || 4.8,
    prep_time: prod.prep_time || '10 min',
    calories: prod.calories || '850 kcal',
    image: prod.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
    description: prod.description || 'Hamburguesa artesanal recién agregada al menú de Hamburger Rapid.',
    ingredients: Array.isArray(prod.ingredients) ? prod.ingredients : ['Carne Seleccionada', 'Queso Fundido', 'Pan Brioche']
  };

  if (isConnectedToMySQL && pool) {
    try {
      const [result] = await pool.query(
        'INSERT INTO products (name, category, price, stock, specialty_badge, specialty_level, rating, prep_time, calories, image, description, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          newProduct.name,
          newProduct.category,
          newProduct.price,
          newProduct.stock,
          newProduct.specialty_badge,
          newProduct.specialty_level,
          newProduct.rating,
          newProduct.prep_time,
          newProduct.calories,
          newProduct.image,
          newProduct.description,
          JSON.stringify(newProduct.ingredients)
        ]
      );
      newProduct.id = result.insertId;
      return newProduct;
    } catch (err) {
      console.error('Error insertando en MySQL:', err.message);
    }
  }

  inMemoryProducts.unshift(newProduct);
  return newProduct;
}

async function deleteProduct(id) {
  const numId = parseInt(id, 10);
  if (isConnectedToMySQL && pool) {
    await pool.query('DELETE FROM products WHERE id = ?', [numId]);
    return true;
  }
  inMemoryProducts = inMemoryProducts.filter(p => p.id !== numId);
  return true;
}

async function resetProducts() {
  inMemoryProducts = [...INITIAL_PRODUCTS];
  if (isConnectedToMySQL && pool) {
    await pool.query('TRUNCATE TABLE products');
    for (const p of INITIAL_PRODUCTS) {
      await pool.query(
        'INSERT INTO products (name, category, price, stock, specialty_badge, specialty_level, rating, prep_time, calories, image, description, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          p.name,
          p.category,
          p.price,
          p.stock,
          p.specialty_badge,
          p.specialty_level,
          p.rating,
          p.prep_time,
          p.calories,
          p.image,
          p.description,
          JSON.stringify(p.ingredients)
        ]
      );
    }
  }
}

function getConsumersMetrics() {
  const totalConsumers = inMemoryConsumers.length;
  const totalOrders = inMemoryConsumers.reduce((acc, c) => acc + c.totalOrders, 0);
  const totalSpent = inMemoryConsumers.reduce((acc, c) => acc + c.totalSpent, 0);
  const totalBurgersConsumed = inMemoryConsumers.reduce((acc, c) => acc + c.burgersConsumed, 0);
  const avgTicket = totalOrders > 0 ? (totalSpent / totalOrders).toFixed(2) : 0;

  // Segment breakdown
  const segments = {
    vip: inMemoryConsumers.filter(c => c.tier.includes('VIP')).length,
    club: inMemoryConsumers.filter(c => c.tier.includes('Club')).length,
    new: inMemoryConsumers.filter(c => c.tier.includes('Nuevo')).length
  };

  // Top consumers sorted by burgers consumed
  const topConsumers = [...inMemoryConsumers].sort((a, b) => b.burgersConsumed - a.burgersConsumed);

  // Consumption by burger
  const burgerConsumption = [
    { name: 'Rey de las Burgers', count: 184, percentage: 32 },
    { name: 'Burger Real Doble', count: 138, percentage: 24 },
    { name: 'Burger Doble Especial', count: 105, percentage: 18 },
    { name: 'Burger Real Clásica', count: 86, percentage: 15 },
    { name: 'Otras Variantes', count: 62, percentage: 11 }
  ];

  return {
    summary: {
      totalConsumers,
      totalOrders,
      totalSpent: totalSpent.toFixed(2),
      totalBurgersConsumed,
      avgTicket
    },
    segments,
    topConsumers,
    burgerConsumption
  };
}

function getOrders() {
  return inMemoryOrders;
}

function createOrder(orderData) {
  const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder = {
    id: orderId,
    customerName: orderData.customerName || 'Cliente Gourmet',
    items: orderData.items || [],
    total: orderData.total || 0,
    status: 'en_preparacion',
    statusLabel: 'En Cocina 👨‍🍳',
    address: orderData.address || 'Av. Principal #101, Local Hamburguesas',
    createdAt: new Date().toISOString(),
    estimatedTime: '15-20 min'
  };

  inMemoryOrders.unshift(newOrder);

  // Update consumers or inventory if applicable
  const foundConsumer = inMemoryConsumers.find(c => c.name.toLowerCase() === newOrder.customerName.toLowerCase());
  if (foundConsumer) {
    foundConsumer.totalOrders += 1;
    foundConsumer.totalSpent += parseFloat(newOrder.total);
    const countItems = (newOrder.items || []).reduce((sum, item) => sum + (item.quantity || 1), 0);
    foundConsumer.burgersConsumed += countItems;
    foundConsumer.lastOrderDate = 'Hace un momento';
  }

  return newOrder;
}

function getDbStatus() {
  return {
    mode: isConnectedToMySQL ? 'mysql' : 'in-memory',
    connected: isConnectedToMySQL,
    host: process.env.DB_HOST || (process.env.DATABASE_URL ? 'via-database-url' : 'in-memory-storage'),
    database: process.env.DB_NAME || 'hamburger_rapid_db',
    user: process.env.DB_USER || 'rapid_admin',
    totalProducts: inMemoryProducts.length,
    totalConsumers: inMemoryConsumers.length,
    activeOrders: inMemoryOrders.filter(o => o.status !== 'entregado').length,
    serverUptime: process.uptime(),
    error: lastDbError
  };
}

module.exports = {
  initDB,
  getProducts,
  addProduct,
  deleteProduct,
  resetProducts,
  getConsumersMetrics,
  getOrders,
  createOrder,
  getDbStatus,
  INITIAL_PRODUCTS,
  INITIAL_CONSUMERS
};
