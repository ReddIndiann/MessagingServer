import { Router } from 'express';
import SendMessage from '../models/SendMessage';
import User from '../models/User';
import Sender from '../models/Sender';

const router = Router();

// Create a new send message
router.post('/', async (req, res) => {
  try {
    const { recipients, senderId, content, messageType, userId, recursion } = req.body;

    // Check if the user and sender exist
    const user = await User.findByPk(userId);
    const sender = await Sender.findByPk(senderId);
    if (!user || !sender) {
      return res.status(404).json({ error: 'User or Sender not found' });
    }

    const sendMessage = await SendMessage.create({
      recipients,
      senderId,
      content,
      messageType,
      userId,
      recursion,
    });
    res.status(201).json(sendMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all send messages
router.get('/', async (req, res) => {
  try {
    const sendMessages = await SendMessage.findAll({ include: [User, Sender] });
    res.json(sendMessages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get send messages by userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const sendMessages = await SendMessage.findAll({
      where: { userId },
      include: [User, Sender],
    });

    if (!sendMessages.length) {
      return res.status(404).json({ error: 'No send messages found for this user' });
    }

    res.json(sendMessages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get send message by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sendMessage = await SendMessage.findByPk(id, { include: [User, Sender] });

    if (!sendMessage) {
      return res.status(404).json({ error: 'Send message not found' });
    }

    res.json(sendMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update send message by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { recipients, content, messageType, recursion } = req.body;

    const sendMessage = await SendMessage.findByPk(id);

    if (!sendMessage) {
      return res.status(404).json({ error: 'Send message not found' });
    }

    sendMessage.recipients = recipients;
    sendMessage.content = content;
    sendMessage.messageType = messageType;
    sendMessage.recursion = recursion;

    await sendMessage.save();

    res.json(sendMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete send message by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sendMessage = await SendMessage.findByPk(id);

    if (!sendMessage) {
      return res.status(404).json({ error: 'Send message not found' });
    }

    await sendMessage.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
