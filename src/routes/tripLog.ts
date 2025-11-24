import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const tripLogs = await prisma.tripLog.findMany({
      include: {
        tripDetails: {
          include: {
            driver: true,
            vehicle: true,
            order: true
          }
        }
      }
    });
    res.json(tripLogs);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tripLog = await prisma.tripLog.findUnique({
      where: { id },
      include: {
        tripDetails: {
          include: {
            driver: true,
            vehicle: true,
            order: true
          }
        }
      }
    });
    
    if (!tripLog) {
      return res.status(404).json({ error: 'Trip log not found' });
    }

    res.json(tripLog);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const data: any = { ...req.body };
    
    if (req.body.departureTime) {
      data.departureTime = new Date(req.body.departureTime);
    }
    if (req.body.arrivalTime) {
      data.arrivalTime = new Date(req.body.arrivalTime);
    }
    
    const tripLog = await prisma.tripLog.create({
      data,
      include: {
        tripDetails: true
      }
    });
    res.status(201).json(tripLog);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data: any = { ...req.body };
    
    if (req.body.departureTime) {
      data.departureTime = new Date(req.body.departureTime);
    }
    if (req.body.arrivalTime) {
      data.arrivalTime = new Date(req.body.arrivalTime);
    }
    
    const tripLog = await prisma.tripLog.update({
      where: { id },
      data,
      include: {
        tripDetails: true
      }
    });
    res.json(tripLog);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.tripLog.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.get('/trip/:tripDetailsId', async (req, res) => {
  try {
    const tripDetailsId = parseInt(req.params.tripDetailsId);
    const logs = await prisma.tripLog.findMany({
      where: { tripDetailsId },
      include: {
        tripDetails: true
      },
      orderBy: {
        departureTime: 'asc'
      }
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

export default router;