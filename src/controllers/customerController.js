import customerService from "../services/customerService.js";

const createCustomer = async (req, res) => {
  try {
    const data = await customerService.createCustomer(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getCustomers = async (req, res) => {
  const data = await customerService.getCustomers();

  res.json(data);
};

const getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await customerService.getCustomerById(id);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateCustomer = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await customerService.updateCustomer(id, req.body, req.customer);

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteCustomer = async (req, res) => {
  const id = req.params.id;

  try {
    await customerService.deleteCustomer(id);

    res.send(`Customer deleted successfully with id: ${id}`);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};





export default {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
