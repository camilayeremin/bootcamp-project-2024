import { NextApiRequest, NextApiResponse } from 'next';
import emailjs from 'emailjs-com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const serviceId = process.env.EMAILJS_SERVICE_ID as string;
      const templateId = process.env.EMAILJS_TEMPLATE_ID as string;
      const userId = process.env.EMAILJS_USER_ID as string;

      if (!serviceId || !templateId || !userId) {
        throw new Error('EmailJS environment variables are not set.');
      }

      const templateParams = {
        name,
        email,
        message,
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}