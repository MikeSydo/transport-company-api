import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const tripDetails = await prisma.tripDetails.findMany({
      include: {
        driver: true,
        vehicle: true,
        order: {
          include: {
            client: true
          }
        },
        tripLogs: true
      }
    });
    res.json(tripDetails);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tripDetail = await prisma.tripDetails.findUnique({
      where: { id },
      include: {
        driver: true,
        vehicle: true,
        order: {
          include: {
            client: true
          }
        },
        tripLogs: true
      }
    });
    
    if (!tripDetail) {
      return res.status(404).json({ error: 'Trip details not found' });
    }

    res.json(tripDetail);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const tripDetail = await prisma.tripDetails.create({
      data: req.body,
      include: {
        driver: true,
        vehicle: true,
        order: true
      }
    });
    res.status(201).json(tripDetail);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tripDetail = await prisma.tripDetails.update({
      where: { id },
      data: req.body,
      include: {
        driver: true,
        vehicle: true,
        order: true
      }
    });
    res.json(tripDetail);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.tripDetails.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

router.get('/status/:status', async (req, res) => {
  try {
    const status = req.params.status;
    const trips = await prisma.tripDetails.findMany({
      where: { status },
      include: {
        driver: true,
        vehicle: true,
        order: true
      }
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
