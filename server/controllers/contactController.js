const ContactMessage = require('../models/ContactMessage');
exports.sendMessage = async (req, res) => {
  try {
    const msg = new ContactMessage(req.body);
    const saved = await msg.save();
    res.status(201).json({ success: true, message: "Message received! We'll be in touch soon.", data: saved });
  } catch (err) { res.status(400).json({ message: err.message }); }
};
exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.markRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(msg);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
