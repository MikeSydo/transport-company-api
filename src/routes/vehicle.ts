import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const { available, date } = req.query;
    
    if (available === 'true') {
      const whereCondition: any = {
        status: { in: ['scheduled', 'in_progress'] }
      };

      if (date) {
        whereCondition.order = {
          departureTime: { lte: new Date(date as string) },
          arrivalTime: { gte: new Date(date as string) }
        };
      }

      const busyVehicleIds = await prisma.tripDetails.findMany({
        where: whereCondition,
        select: { vehicleId: true }
      });

      const vehicles = await prisma.vehicle.findMany({
        where: {
          id: { notIn: busyVehicleIds.map(t => t.vehicleId) }
        }
      });

      return res.json(vehicles);
    }

    const vehicles = await prisma.vehicle.findMany({
      include: { trips: true }
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        trips: {
          include: {
            driver: true,
            order: true,
            tripLogs: true
          }
        }
      }
    });
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.create({
      data: req.body
    });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: req.body
    });
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.vehicle.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
