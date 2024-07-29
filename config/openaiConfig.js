const { Configuration, OpenAIApi, default: OpenAI } = require('openai')
require('dotenv').config()

const configuration = new OpenAI({
  apiKey: process.env.TravelSecretKey,
})

module.exports = configuration