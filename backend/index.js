const express = require('express');
const { createTransaction } = require('./functions');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/create-transaction', async (req, res) => {
  const { toAddress, amount } = req.body;

  if (!toAddress) {
    return res.status(400).json({ error: 'Destination address is required.' });
  }

  try {
    const rawTx = await createTransaction(toAddress, amount || 5000);
    if (!rawTx) {
      return res.status(400).json({ error: 'Unable to create transaction. Possibly insufficient balance or no UTXOs.' });
    }
    res.json({ rawTransaction: rawTx });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));