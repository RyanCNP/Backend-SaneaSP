import { Router } from 'express';
import { createPaymentIntent, stripeWebhook } from '../controllers/stripe.controller';

const router = Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', stripeWebhook); 

export default router;
