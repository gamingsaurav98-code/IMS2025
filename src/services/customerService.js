import Customer from "../models/Customer.js";

const createCustomer = async (data) => await Customer.create(data);

const getCustomers = async () => {
  const customers = await Customer.find();

  return customers;
};

const getCustomerById = async (id) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw {
      statusCode: 404,
      message: "Customer not found",
    };
  }

  return customer;
};

const updateCustomer = async (id, data) => {
  const customer = await getCustomerById(id);



  const updatedCustomer = await Customer.findByIdAndUpdate(
    id,
    {
      name: data.name,
      phone: data.phone,
      address: data.address,
    },
    { new: true }
  );

  return updatedCustomer;
};

const deleteCustomer = async (id) => {
  await Customer.findByIdAndDelete(id);
};



export default {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
