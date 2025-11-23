import { Request, Response } from 'express';
import Stripe from 'stripe';
import { PrefeituraModel } from '../models';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-10-29.clover', // Versão oficial do Stripe, ajuste conforme necessário
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, recordId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      metadata: { recordId: String(recordId) },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const stripeWebhook = (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      (req as any).rawBody || req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    res.status(400).send(`Webhook error: ${err.message}`);
    return
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as Stripe.PaymentIntent;
    const recordId = intent.metadata.recordId;
    console.log("Pagamento realizado! Atualizando registro:", recordId);
  }

  res.json({ received: true });
};
