
const { OpenAI } = require('openai')
require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.TravelSecretKey,
})

const generateAnswer = async (req, res) => {
  const { title } = req.body
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'user', content: `Come up with a description for YouTube video called ${title}` },
    ],
    model: 'gpt-3.5-turbo-1106',
  })
  console.log("one")
  // console.log(response.choices[0].message.content)

  const tags = await openai.chat.completions.create({
    messages: [
      { 
        role: 'user', 
        content: `Come up with 10 keywords for YouTube video called ${title}` 
      },
    ],
    model: 'gpt-3.5-turbo-1106',
  })
  console.log("two")
  // console.log(tags.choices[0].message.content)

  res.status(200).json({
    description: response.choices[0].message.content,
    tags: tags.choices[0].message.content
  })
}

const generateImage = async (req, res) => {

  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: req.body.prompt,
    n: 1,
    size: '1024x1024'
  })

  // console.log(image.data[0].url)
  res.json({
    url: image.data[0].url
  })
}


module.exports = { generateAnswer, generateImage }