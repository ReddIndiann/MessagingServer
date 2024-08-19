import { Router } from 'express';
import ScheduleMessage from '../models/ScheduleMessage';
import User from '../models/User';
import Sender from '../models/Sender';

const router = Router();

// Create a new scheduled message
router.post('/', async (req, res) => {
  try {
    const { recipients, senderId, content, messageType, userId, dateScheduled, timeScheduled, recursion } = req.body;

    // Check if the user and sender exist
    const user = await User.findByPk(userId);
    const sender = await Sender.findByPk(senderId);
    if (!user || !sender) {
      return res.status(404).json({ error: 'User or Sender not found' });
    }

    const scheduleMessage = await ScheduleMessage.create({
      recipients,
      senderId,
      content,
      messageType,
      userId,
      dateScheduled,
      timeScheduled,
      recursion,
    });
    res.status(201).json(scheduleMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all scheduled messages
router.get('/', async (req, res) => {
  try {
    const scheduleMessages = await ScheduleMessage.findAll({ include: [User, Sender] });
    res.json(scheduleMessages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get scheduled message by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const scheduleMessage = await ScheduleMessage.findByPk(id, { include: [User, Sender] });

    if (!scheduleMessage) {
      return res.status(404).json({ error: 'Scheduled message not found' });
    }

    res.json(scheduleMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get scheduled messages by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const scheduleMessages = await ScheduleMessage.findAll({ where: { userId }, include: [User, Sender] });

    res.json(scheduleMessages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update scheduled message by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { recipients, content, messageType, dateScheduled, timeScheduled, recursion } = req.body;

    const scheduleMessage = await ScheduleMessage.findByPk(id);

    if (!scheduleMessage) {
      return res.status(404).json({ error: 'Scheduled message not found' });
    }

    scheduleMessage.recipients = recipients;
    scheduleMessage.content = content;
    scheduleMessage.messageType = messageType;
    scheduleMessage.dateScheduled = dateScheduled;
    scheduleMessage.timeScheduled = timeScheduled;
    scheduleMessage.recursion = recursion;

    await scheduleMessage.save();

    res.json(scheduleMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete scheduled message by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const scheduleMessage = await ScheduleMessage.findByPk(id);

    if (!scheduleMessage) {
      return res.status(404).json({ error: 'Scheduled message not found' });
    }

    await scheduleMessage.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
