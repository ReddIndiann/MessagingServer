import express from 'express';
import sequelize from './config/database';
import User from './models/User';
import Sender from './models/Sender';
import MessageTemplate from './models/MessageTemplate';
import Contact from './models/Contact';
import Group from './models/Group';
import SendMessage from './models/SendMessage';
import ScheduleMessage from './models/ScheduleMessage';
import cors from 'cors';
import senderRoutes from './routes/senderRoutes';
import messageTemplateRoutes from './routes/messageTemplateRoutes';
import contactRoutes from './routes/contactRoutes';
import groupRoutes from './routes/groupRoutes';
import sendMessageRoutes from './routes/sendMessageRoutes';
import scheduleMessageRoutes from './routes/ScheduleMessageRoutes';
import authRoutes from './routes/authRoutes';
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const port = 5000;
 
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/senders', senderRoutes);
app.use('/message-templates', messageTemplateRoutes);
app.use('/contacts', contactRoutes);
app.use('/groups', groupRoutes);
app.use('/send-messages', sendMessageRoutes);
app.use('/schedule-messages', scheduleMessageRoutes); 

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  
  try {
    await sequelize.sync({ alter: true }); // Sync all models
    console.log('Database & tables created!');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
});
