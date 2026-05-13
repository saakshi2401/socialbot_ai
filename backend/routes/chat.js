const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const auth = require('../middleware/auth');
const Chat = require('../models/Chat');

const router = express.Router();

// Create or continue a chat session
router.post('/generate', auth, async (req, res) => {
  const { chatId, prompt, platform, tone, feature } = req.body;
  try {
    let chat;
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, user: req.user.id });
      if (!chat) return res.status(404).json({ message: 'Chat not found' });
    } else {
      chat = new Chat({ user: req.user.id, platform: platform || 'General' });
      // Generate a simple title based on the first prompt
      chat.title = prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt;
    }

    // Save user message
    chat.messages.push({ role: 'user', content: prompt });
    
    // Construct instructions for Gemini
    const systemInstruction = `You are an expert social media manager named SocialBot AI. 
Task: ${feature || 'General Assistant'}. 
Target Platform: ${platform || 'General'}. 
Desired Tone: ${tone || 'Professional'}. 
Tailor the content appropriately to the platform's best practices.
User Request: ${prompt}`;

    const axios = require('axios');
    
    // Call the free text.pollinations.ai API
    const aiResponse = await axios.post('https://text.pollinations.ai/', {
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt }
      ]
    });
    
    const responseText = aiResponse.data;

    // Save AI response
    chat.messages.push({ role: 'model', content: responseText });
    
    await chat.save();
    
    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating content: ' + err.message);
  }
});

// Get all chats for a user
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id }).sort({ updatedAt: -1 }).select('-messages');
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific chat
router.get('/:id', auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, user: req.user.id });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a chat
router.delete('/:id', auth, async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json({ message: 'Chat deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
