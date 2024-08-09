const express = require('express');
const bodyParser = require('body-parser');
const {
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  destroyReservation,
} = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.get('/api/customers', async (req, res) => {
  const customers = await fetchCustomers();
  res.json(customers);
});

app.get('/api/restaurants', async (req, res) => {
  const restaurants = await fetchRestaurants();
  res.json(restaurants);
});

app.get('/api/reservations', async (req, res) => {
  const reservations = await fetchReservations();
  res.json(reservations);
});

app.post('/api/customers/:id/reservations', async (req, res) => {
  const { id } = req.params;
  const { restaurant_id, date, party_count } = req.body;

  try {
    const reservation = await createReservation(
      id,
      restaurant_id,
      date,
      party_count
    );
    res.status(201).json(reservation);
  } catch (err) {
    console.error('Error creating reservation:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/customers/:customer_id/reservations/:id', async (req, res) => {
  const { id } = req.params;
  await destroyReservation(id);
  res.status(204).end();
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const init = async () => {
  try {
    await createTables();
    console.log('Tables created');
    const customer1 = await createCustomer('Lisa Simpson');
    const customer2 = await createCustomer('Bob Vance');

    const restaurant1 = await createRestaurant('Happy Lamb');
    const restaurant2 = await createRestaurant('Thirsty Cow');
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log('Server running on port 3000');
    });
  } catch (err) {
    console.error('Failure', err);
  }
};

init();
