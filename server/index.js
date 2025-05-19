import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import guestRoutes from './routes/guestRoutes.js';
import weddingRoutes from './routes/weddingRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';

dotenv.config();

const app = express();

app.use(cors()); // ✅ une seule fois
app.use(express.json());

// Routes
app.use('/api/weddings', weddingRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/budget', budgetRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Serveur en écoute sur le port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));
