import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const dateFilter: any = {};
    
    if (startDate || endDate) {
      dateFilter.departureTime = {};
      
      if (startDate) {
        dateFilter.departureTime.gte = new Date(startDate as string);
      }
      
      if (endDate) {
        dateFilter.departureTime.lte = new Date(endDate as string);
      }
    }

    const orders = await prisma.order.findMany({
      where: Object.keys(dateFilter).length > 0 ? dateFilter : undefined,
      include: {
        client: true,
        tripDetails: {
          include: {
            driver: true,
            vehicle: true
          }
        }
      },
      orderBy: {
        departureTime: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error)
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const order = await prisma.order.findUnique({
      where: { id },
      include: { 
        client: true,
        tripDetails: {
          include: {
            driver: true,
            vehicle: true,
            tripLogs: true
          }
        }
      }
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { clientId, routeFrom, routeTo, departureTime, arrivalTime } = req.body;
    
    if (!clientId || !routeFrom || !routeTo || !departureTime || !arrivalTime) {
      return res.status(400).json({
        error: 'Missing required fields: clientId, routeFrom, routeTo, departureTime, arrivalTime'
      });
    }
    
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    
    if (isNaN(departure.getTime()) || isNaN(arrival.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    
    if (arrival <= departure) {
      return res.status(400).json({ 
        error: 'Arrival time must be after departure time' 
      });
    }
    
    const order = await prisma.order.create({
      data: {
        clientId: parseInt(clientId),
        routeFrom,
        routeTo,
        departureTime: departure,
        arrivalTime: arrival
      },
      include: {
        client: true
      }
    });
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const data: any = {};
    
    if (req.body.routeFrom !== undefined) data.routeFrom = req.body.routeFrom;
    if (req.body.routeTo !== undefined) data.routeTo = req.body.routeTo;
    
    if (req.body.clientId !== undefined) {
      data.clientId = parseInt(req.body.clientId);
    }
    
    if (req.body.departureTime) {
      const departure = new Date(req.body.departureTime);
      if (isNaN(departure.getTime())) {
        return res.status(400).json({ error: 'Invalid departureTime format' });
      }
      data.departureTime = departure;
    }
    
    if (req.body.arrivalTime) {
      const arrival = new Date(req.body.arrivalTime);
      if (isNaN(arrival.getTime())) {
        return res.status(400).json({ error: 'Invalid arrivalTime format' });
      }
      data.arrivalTime = arrival;
    }
    
    if (data.departureTime && data.arrivalTime) {
      if (data.arrivalTime <= data.departureTime) {
        return res.status(400).json({ 
          error: 'Arrival time must be after departure time' 
        });
      }
    }
    
    const order = await prisma.order.update({
      where: { id },
      data,
      include: {
        client: true,
        tripDetails: true
      }
    });
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    await prisma.order.delete({ 
      where: { id } 
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});

export default router;
