const mongoose = require('mongoose');
const demoStore = require('../utils/demoStore');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Full name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
  phone: { type: String, required: [true, 'Phone number is required'], trim: true },
  passwordHash: { type: String, required: [true, 'Password hash is required'] },
  address: { type: String, default: '', trim: true },
  role: { type: String, default: 'customer' }
}, { timestamps: true });

const MongooseUser = mongoose.model('User', userSchema);
const isConnected = () => mongoose.connection.readyState === 1;

module.exports = {
  findOne: (query) => isConnected() ? MongooseUser.findOne(query) : demoStore.findUserByQuery(query),
  findById: (id) => isConnected() ? MongooseUser.findById(id) : demoStore.findUserById(id),
  create: (data) => isConnected() ? MongooseUser.create(data) : demoStore.createUser(data),
  findByIdAndUpdate: (id, data, opt) => isConnected() ? MongooseUser.findByIdAndUpdate(id, data, opt) : demoStore.updateUserById(id, data),
  deleteMany: (query) => isConnected() ? MongooseUser.deleteMany(query) : Promise.resolve()
};
