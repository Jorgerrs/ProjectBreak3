const { MongoClient } = require('mongodb');

const data = [
  {
    id: 1,
    name: 'Bicho',
    rarity: 'common',
    unlocked: true,
    image: 'images/bicho.svg',
    abilities: {
      piedra: 'Caparaz\u00f3n duro',
      papel: 'Envoltura pegajosa',
      tijera: 'Pinzas agudas'
    }
  },
  {
    id: 2,
    name: 'Topo',
    rarity: 'common',
    unlocked: true,
    image: 'images/topo.svg',
    abilities: {
      piedra: 'Golpe subterr\u00e1neo',
      papel: 'Mont\u00f3n de tierra',
      tijera: 'Ara\u00f1azo'
    }
  },
  {
    id: 3,
    name: 'Rata',
    rarity: 'common',
    unlocked: true,
    image: 'images/rata.svg',
    abilities: {
      piedra: 'Mordisco roedor',
      papel: 'Cola flexible',
      tijera: 'Ara\u00f1azo r\u00e1pido'
    }
  },
  {
    id: 4,
    name: 'Lobo',
    rarity: 'common',
    unlocked: false,
    image: 'images/lobo.svg',
    abilities: {
      piedra: 'Embestida',
      papel: 'Aullido aturdidor',
      tijera: 'Mordida salvaje'
    }
  },
  {
    id: 5,
    name: 'Orco',
    rarity: 'poco comun',
    unlocked: false,
    image: 'images/orco.svg',
    abilities: {
      piedra: 'Mazo pesado',
      papel: 'Escudo improvisado',
      tijera: 'Hachazo'
    }
  },
  {
    id: 6,
    name: 'Golem',
    rarity: 'poco comun',
    unlocked: false,
    image: 'images/golem.svg',
    abilities: {
      piedra: 'Pu\u00f1o de roca',
      papel: 'Torbellino de polvo',
      tijera: 'Aplastamiento'
    }
  },
  {
    id: 7,
    name: 'Harpia',
    rarity: 'poco comun',
    unlocked: false,
    image: 'images/harpia.svg',
    abilities: {
      piedra: 'Picotazo',
      papel: 'Plumas cortantes',
      tijera: 'Garras r\u00e1pidas'
    }
  },
  {
    id: 8,
    name: 'Dragon',
    rarity: 'epico',
    unlocked: false,
    image: 'images/dragon.svg',
    abilities: {
      piedra: 'Golpe de cola',
      papel: 'Ala protectora',
      tijera: 'Aliento de fuego'
    }
  },
  {
    id: 9,
    name: 'Kraken',
    rarity: 'epico',
    unlocked: false,
    image: 'images/kraken.svg',
    abilities: {
      piedra: 'Tent\u00e1culo poderoso',
      papel: 'Tinta envolvente',
      tijera: 'Agarre cortante'
    }
  },
  {
    id: 10,
    name: 'Fenix',
    rarity: 'legendario',
    unlocked: false,
    image: 'images/fenix.svg',
    abilities: {
      piedra: 'Llama eterna',
      papel: 'Canto revitalizador',
      tijera: 'Vuelo abrasador'
    }
  }
];

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/monsters';

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();
  const collection = db.collection('monsters');
  await collection.deleteMany({});
  await collection.insertMany(data);
  console.log('Database seeded');
  await client.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
