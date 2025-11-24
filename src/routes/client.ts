import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: { 
        orders: true 
      }
    });
    res.json(clients);
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
    
    const client = await prisma.client.findUnique({
      where: { id },
      include: { 
        orders: {
          include: {
            tripDetails: true
          }
        }
      }
    });
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, company } = req.body;
    
    if (!name || !company) {
      return res.status(400).json({ 
        error: 'Missing required fields: name and company are required' 
      });
    }
    
    const client = await prisma.client.create({
      data: {
        name: req.body.name,
        company: req.body.company,
        phones: req.body.phones || [],
        contactInfo: req.body.contactInfo || []
      }
    });
    
    res.status(201).json(client);
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
    
    const client = await prisma.client.update({
      where: { id },
      data: req.body
    });
    
    res.json(client);
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
    
    await prisma.client.delete({ 
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
