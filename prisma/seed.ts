import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.tripLog.deleteMany();
  await prisma.order.deleteMany();
  await prisma.tripDetails.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.client.deleteMany();

  const clients = await Promise.all([
    prisma.client.create({
      data: {
        name: 'Іван Петренко',
        phones: ['+380671234567', '+380931234567'],
        contactInfo: ['ivan@example.com', 'Київ, вул. Хрещатик 1'],
        company: 'ТОВ "Логістик Плюс"'
      }
    }),
    prisma.client.create({
      data: {
        name: 'Олена Коваленко',
        phones: ['+380502345678'],
        contactInfo: ['olena@company.com', 'Львів, пр. Свободи 20'],
        company: 'ПП "Транс-Сервіс"'
      }
    }),
    prisma.client.create({
      data: {
        name: 'Микола Шевченко',
        phones: ['+380633456789', '+380993456789'],
        contactInfo: ['mykola@trade.com', 'Одеса, вул. Дерибасівська 5'],
        company: 'ТОВ "Торгівельний Дім"'
      }
    }),
    prisma.client.create({
      data: {
        name: 'Марія Бондаренко',
        phones: ['+380664567890'],
        contactInfo: ['maria@logistics.ua', 'Харків, вул. Сумська 10'],
        company: 'ТОВ "Швидка Доставка"'
      }
    }),
    prisma.client.create({
      data: {
        name: 'Андрій Мельник',
        phones: ['+380505678901', '+380675678901'],
        contactInfo: ['andrii@cargo.com', 'Дніпро, пр. Яворницького 15'],
        company: 'ПАТ "Карго Експрес"'
      }
    })
  ]);

  const drivers = await Promise.all([
    prisma.driver.create({
      data: {
        name: 'Василь Іваненко',
        phones: ['+380671111111'],
        contactInfo: ['vasyl@driver.com'],
        licenseNumber: 'DRV001234',
        licenseExpiry: new Date('2027-12-31')
      }
    }),
    prisma.driver.create({
      data: {
        name: 'Олександр Коваль',
        phones: ['+380672222222'],
        contactInfo: ['oleksandr@driver.com'],
        licenseNumber: 'DRV002345',
        licenseExpiry: new Date('2028-06-30')
      }
    }),
    prisma.driver.create({
      data: {
        name: 'Сергій Петров',
        phones: ['+380673333333'],
        contactInfo: ['serhii@driver.com'],
        licenseNumber: 'DRV003456',
        licenseExpiry: new Date('2026-11-15')
      }
    }),
    prisma.driver.create({
      data: {
        name: 'Дмитро Сидоренко',
        phones: ['+380674444444'],
        contactInfo: ['dmytro@driver.com'],
        licenseNumber: 'DRV004567',
        licenseExpiry: new Date('2027-08-20')
      }
    }),
    prisma.driver.create({
      data: {
        name: 'Ігор Лисенко',
        phones: ['+380675555555'],
        contactInfo: ['ihor@driver.com'],
        licenseNumber: 'DRV005678',
        licenseExpiry: new Date('2029-03-10')
      }
    }),
    prisma.driver.create({
      data: {
        name: 'Віктор Морозов',
        phones: ['+380676666666'],
        contactInfo: ['viktor@driver.com'],
        licenseNumber: 'DRV006789',
        licenseExpiry: new Date('2028-09-25')
      }
    }),
    prisma.driver.create({
      data: {
        name: 'Богдан Ткаченко',
        phones: ['+380677777777'],
        contactInfo: ['bohdan@driver.com'],
        licenseNumber: 'DRV007890',
        licenseExpiry: new Date('2027-04-18')
      }
    }),
    prisma.driver.create({
      data: {
        name: 'Юрій Кравченко',
        phones: ['+380678888888'],
        contactInfo: ['yurii@driver.com'],
        licenseNumber: 'DRV008901',
        licenseExpiry: new Date('2028-12-05')
      }
    })
  ]);

  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        registrationNumber: 'AA1234BB',
        type: 'Вантажівка',
        model: 'Mercedes-Benz Actros',
        year: 2022,
        capacity: 20.0,
        fuelType: 'Дизель'
      }
    }),
    prisma.vehicle.create({
      data: {
        registrationNumber: 'BB2345CC',
        type: 'Вантажівка',
        model: 'MAN TGX',
        year: 2021,
        capacity: 18.5,
        fuelType: 'Дизель'
      }
    }),
    prisma.vehicle.create({
      data: {
        registrationNumber: 'CC3456DD',
        type: 'Вантажівка',
        model: 'Volvo FH',
        year: 2023,
        capacity: 22.0,
        fuelType: 'Дизель'
      }
    }),
    prisma.vehicle.create({
      data: {
        registrationNumber: 'DD4567EE',
        type: 'Фургон',
        model: 'Ford Transit',
        year: 2022,
        capacity: 3.5,
        fuelType: 'Дизель'
      }
    }),
    prisma.vehicle.create({
      data: {
        registrationNumber: 'EE5678FF',
        type: 'Фургон',
        model: 'Mercedes-Benz Sprinter',
        year: 2021,
        capacity: 4.0,
        fuelType: 'Дизель'
      }
    }),
    prisma.vehicle.create({
      data: {
        registrationNumber: 'FF6789GG',
        type: 'Вантажівка',
        model: 'Scania R450',
        year: 2020,
        capacity: 19.0,
        fuelType: 'Дизель'
      }
    }),
    prisma.vehicle.create({
      data: {
        registrationNumber: 'GG7890HH',
        type: 'Легковий',
        model: 'Toyota Camry',
        year: 2023,
        capacity: 0.5,
        fuelType: 'Бензин'
      }
    }),
    prisma.vehicle.create({
      data: {
        registrationNumber: 'HH8901II',
        type: 'Вантажівка',
        model: 'DAF XF',
        year: 2022,
        capacity: 21.0,
        fuelType: 'Дизель'
      }
    })
  ]);

  const tripDetails = await Promise.all([
    prisma.tripDetails.create({
      data: {
        driverId: drivers[0].id,
        vehicleId: vehicles[0].id,
        routeFrom: 'Київ',
        routeTo: 'Львів',
        status: 'completed',
        expenses: 2500.00
      }
    }),
    prisma.tripDetails.create({
      data: {
        driverId: drivers[1].id,
        vehicleId: vehicles[1].id,
        routeFrom: 'Львів',
        routeTo: 'Одеса',
        status: 'completed',
        expenses: 3200.50
      }
    }),
    prisma.tripDetails.create({
      data: {
        driverId: drivers[2].id,
        vehicleId: vehicles[2].id,
        routeFrom: 'Харків',
        routeTo: 'Дніпро',
        status: 'completed',
        expenses: 1800.00
      }
    }),
    prisma.tripDetails.create({
      data: {
        driverId: drivers[3].id,
        vehicleId: vehicles[3].id,
        routeFrom: 'Київ',
        routeTo: 'Одеса',
        status: 'completed',
        expenses: 2900.00
      }
    }),
    prisma.tripDetails.create({
      data: {
        driverId: drivers[4].id,
        vehicleId: vehicles[4].id,
        routeFrom: 'Дніпро',
        routeTo: 'Запоріжжя',
        status: 'completed',
        expenses: 1200.00
      }
    }),
    prisma.tripDetails.create({
      data: {
        driverId: drivers[5].id,
        vehicleId: vehicles[5].id,
        routeFrom: 'Львів',
        routeTo: 'Ужгород',
        status: 'in_progress',
        expenses: 1500.00
      }
    }),
    prisma.tripDetails.create({
      data: {
        driverId: drivers[6].id,
        vehicleId: vehicles[6].id,
        routeFrom: 'Київ',
        routeTo: 'Харків',
        status: 'in_progress',
        expenses: 2100.00
      }
    }),
    prisma.tripDetails.create({
      data: {
        driverId: drivers[7].id,
        vehicleId: vehicles[7].id,
        routeFrom: 'Одеса',
        routeTo: 'Миколаїв',
        status: 'scheduled',
        expenses: 1000.00
      }
    }),
    prisma.tripDetails.create({
      data: {
        driverId: drivers[0].id,
        vehicleId: vehicles[0].id,
        routeFrom: 'Вінниця',
        routeTo: 'Житомир',
        status: 'scheduled',
        expenses: 1400.00
      }
    }),
    prisma.tripDetails.create({
      data: {
        driverId: drivers[1].id,
        vehicleId: vehicles[1].id,
        routeFrom: 'Полтава',
        routeTo: 'Суми',
        status: 'scheduled',
        expenses: 1600.00
      }
    })
  ]);

  await Promise.all([
    prisma.order.create({
      data: {
        clientId: clients[0].id,
        routeFrom: 'Київ',
        routeTo: 'Львів',
        departureTime: new Date('2025-11-20T08:00:00Z'),
        arrivalTime: new Date('2025-11-20T14:00:00Z'),
        tripDetailsId: tripDetails[0].id
      }
    }),
    prisma.order.create({
      data: {
        clientId: clients[1].id,
        routeFrom: 'Львів',
        routeTo: 'Одеса',
        departureTime: new Date('2025-11-21T09:00:00Z'),
        arrivalTime: new Date('2025-11-21T17:00:00Z'),
        tripDetailsId: tripDetails[1].id
      }
    }),
    prisma.order.create({
      data: {
        clientId: clients[2].id,
        routeFrom: 'Харків',
        routeTo: 'Дніпро',
        departureTime: new Date('2025-11-22T07:30:00Z'),
        arrivalTime: new Date('2025-11-22T11:30:00Z'),
        tripDetailsId: tripDetails[2].id
      }
    }),
    prisma.order.create({
      data: {
        clientId: clients[0].id,
        routeFrom: 'Київ',
        routeTo: 'Одеса',
        departureTime: new Date('2025-11-23T10:00:00Z'),
        arrivalTime: new Date('2025-11-23T16:00:00Z'),
        tripDetailsId: tripDetails[3].id
      }
    }),
    prisma.order.create({
      data: {
        clientId: clients[3].id,
        routeFrom: 'Дніпро',
        routeTo: 'Запоріжжя',
        departureTime: new Date('2025-11-24T08:30:00Z'),
        arrivalTime: new Date('2025-11-24T11:00:00Z'),
        tripDetailsId: tripDetails[4].id
      }
    }),
    prisma.order.create({
      data: {
        clientId: clients[4].id,
        routeFrom: 'Львів',
        routeTo: 'Ужгород',
        departureTime: new Date('2025-11-25T06:00:00Z'),
        arrivalTime: new Date('2025-11-25T10:00:00Z'),
        tripDetailsId: tripDetails[5].id
      }
    }),
    prisma.order.create({
      data: {
        clientId: clients[1].id,
        routeFrom: 'Київ',
        routeTo: 'Харків',
        departureTime: new Date('2025-11-26T09:00:00Z'),
        arrivalTime: new Date('2025-11-26T14:00:00Z'),
        tripDetailsId: tripDetails[6].id
      }
    }),
    prisma.order.create({
      data: {
        clientId: clients[2].id,
        routeFrom: 'Одеса',
        routeTo: 'Миколаїв',
        departureTime: new Date('2025-11-27T11:00:00Z'),
        arrivalTime: new Date('2025-11-27T13:30:00Z'),
        tripDetailsId: tripDetails[7].id
      }
    }),
    prisma.order.create({
      data: {
        clientId: clients[3].id,
        routeFrom: 'Вінниця',
        routeTo: 'Житомир',
        departureTime: new Date('2025-11-28T08:00:00Z'),
        arrivalTime: new Date('2025-11-28T11:00:00Z'),
        tripDetailsId: tripDetails[8].id
      }
    }),
    prisma.order.create({
      data: {
        clientId: clients[4].id,
        routeFrom: 'Полтава',
        routeTo: 'Суми',
        departureTime: new Date('2025-11-29T07:00:00Z'),
        arrivalTime: new Date('2025-11-29T10:30:00Z'),
        tripDetailsId: tripDetails[9].id
      }
    })
  ]);

  await Promise.all([
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[0].id,
        location: 'Київ (відправлення)',
        departureTime: new Date('2025-11-20T08:00:00Z'),
        arrivalTime: null,
        comments: 'Завантаження завершено',
        expenses: 0
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[0].id,
        location: 'Житомир (проміжна зупинка)',
        departureTime: new Date('2025-11-20T10:30:00Z'),
        arrivalTime: new Date('2025-11-20T11:00:00Z'),
        comments: 'Технічна зупинка, заправка',
        expenses: 1500.00
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[0].id,
        location: 'Львів (прибуття)',
        departureTime: null,
        arrivalTime: new Date('2025-11-20T14:00:00Z'),
        comments: 'Вантаж доставлено, розвантаження завершено',
        expenses: 0
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[1].id,
        location: 'Львів (відправлення)',
        departureTime: new Date('2025-11-21T09:00:00Z'),
        arrivalTime: null,
        comments: 'Старт маршруту',
        expenses: 0
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[1].id,
        location: 'Тернопіль (обід)',
        departureTime: new Date('2025-11-21T12:00:00Z'),
        arrivalTime: new Date('2025-11-21T13:00:00Z'),
        comments: 'Обідня перерва',
        expenses: 350.00
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[1].id,
        location: 'Одеса (прибуття)',
        departureTime: null,
        arrivalTime: new Date('2025-11-21T17:00:00Z'),
        comments: 'Успішна доставка',
        expenses: 0
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[2].id,
        location: 'Харків (відправлення)',
        departureTime: new Date('2025-11-22T07:30:00Z'),
        arrivalTime: null,
        comments: 'Вихід на маршрут',
        expenses: 0
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[2].id,
        location: 'Дніпро (прибуття)',
        departureTime: null,
        arrivalTime: new Date('2025-11-22T11:30:00Z'),
        comments: 'Доставлено вчасно',
        expenses: 800.00
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[3].id,
        location: 'Київ (відправлення)',
        departureTime: new Date('2025-11-23T10:00:00Z'),
        arrivalTime: null,
        comments: 'Початок рейсу',
        expenses: 0
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[3].id,
        location: 'Умань (зупинка)',
        departureTime: new Date('2025-11-23T12:30:00Z'),
        arrivalTime: new Date('2025-11-23T13:00:00Z'),
        comments: 'Короткочасна зупинка',
        expenses: 200.00
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[3].id,
        location: 'Одеса (прибуття)',
        departureTime: null,
        arrivalTime: new Date('2025-11-23T16:00:00Z'),
        comments: 'Вантаж розвантажено',
        expenses: 0
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[4].id,
        location: 'Дніпро (відправлення)',
        departureTime: new Date('2025-11-24T08:30:00Z'),
        arrivalTime: null,
        comments: 'Рейс розпочато',
        expenses: 0
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[4].id,
        location: 'Запоріжжя (прибуття)',
        departureTime: null,
        arrivalTime: new Date('2025-11-24T11:00:00Z'),
        comments: 'Швидка доставка',
        expenses: 600.00
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[5].id,
        location: 'Львів (відправлення)',
        departureTime: new Date('2025-11-25T06:00:00Z'),
        arrivalTime: null,
        comments: 'В дорозі до Ужгороду',
        expenses: 0
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[5].id,
        location: 'Стрий (заправка)',
        departureTime: new Date('2025-11-25T07:30:00Z'),
        arrivalTime: new Date('2025-11-25T08:00:00Z'),
        comments: 'Заправка палива',
        expenses: 900.00
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[6].id,
        location: 'Київ (відправлення)',
        departureTime: new Date('2025-11-26T09:00:00Z'),
        arrivalTime: null,
        comments: 'Прямування до Харкова',
        expenses: 0
      }
    }),
    prisma.tripLog.create({
      data: {
        tripDetailsId: tripDetails[6].id,
        location: 'Полтава (перерва)',
        departureTime: new Date('2025-11-26T11:30:00Z'),
        arrivalTime: new Date('2025-11-26T12:00:00Z'),
        comments: 'Технічна перерва',
        expenses: 300.00
      }
    })
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
