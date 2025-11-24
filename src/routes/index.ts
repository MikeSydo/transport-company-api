import { Router } from 'express';
import clientRouter from './client';
import orderRouter from './order';
import driverRouter from './driver';
import vehicleRouter from './vehicle';
import tripDetailsRouter from './tripDetails';
import tripLogRouter from './tripLog';

const router = Router();     

router.use('/clients', clientRouter);
router.use('/orders', orderRouter);
router.use('/drivers', driverRouter);
router.use('/vehicles', vehicleRouter);
router.use('/trips', tripDetailsRouter);
router.use('/tripLogs', tripLogRouter);

export default router;