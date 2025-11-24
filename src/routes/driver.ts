import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      include: { trips: true }
    });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const driver = await prisma.driver.findUnique({
      where: { id },
      include: {
        trips: {
          include: {
            order: true,
            vehicle: true,
            tripLogs: true
          }
        }
      }
    });
    
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const data: any = { ...req.body };
    
    if (req.body.licenseExpiry) {
      data.licenseExpiry = new Date(req.body.licenseExpiry);
    }
    
    const driver = await prisma.driver.create({
      data
    });
    res.status(201).json(driver);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data: any = { ...req.body };
    
    if (req.body.licenseExpiry) {
      data.licenseExpiry = new Date(req.body.licenseExpiry);
    }
    
    const driver = await prisma.driver.update({
      where: { id },
      data
    });
    res.json(driver);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.driver.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.get('/:id/trip-history', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const status = req.query.status as string | undefined;
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const driver = await prisma.driver.findUnique({
      where: { id }
    });
    
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    
    const whereClause: any = { driverId: id };
    
    if (status) {
      whereClause.status = status;
    }
    
    const tripHistory = await prisma.tripDetails.findMany({
      where: whereClause,
      include: {
        order: {
          include: {
            client: true
          }
        },
        vehicle: true,
        tripLogs: {
          orderBy: {
            departureTime: 'asc'
          }
        }
      } 
    });
    
    const stats = {
      totalTrips: tripHistory.length,
      completedTrips: tripHistory.filter(t => t.status === 'completed').length,
      inProgressTrips: tripHistory.filter(t => t.status === 'in_progress').length,
      scheduledTrips: tripHistory.filter(t => t.status === 'scheduled').length,
      totalExpenses: tripHistory.reduce((sum, t) => sum + t.expenses, 0)
    };
    
    res.json({
      driver: {
        id: driver.id,
        name: driver.name,
        licenseNumber: driver.licenseNumber
      },
      filter: status ? { status } : { status: 'all' },
      statistics: stats,
      trips: tripHistory
    });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});


export default router;