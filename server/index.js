import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import guestRoutes from './routes/guestRoutes.js';
import weddingRoutes from './routes/weddingRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Correctif important : la route budget doit être plurielle, cohérente avec React
app.use('/api/weddings', weddingRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Serveur en écoute sur le port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));
