import Guest from '../models/Guest.js';

export const getAllGuests = async (req, res) => {
  const guests = await Guest.find();
  res.json(guests);
};

export const addGuest = async (req, res) => {
  const { name, email } = req.body;
  const guest = new Guest({ name, email });
  await guest.save();
  res.status(201).json(guest);
};
