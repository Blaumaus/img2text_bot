// TODO: REFACTOR
// TODO: REWRITE TO DECLARATIVE STYLE WHERE POSSIBLE
// TODO: REWRITE TO ES6 STYLE

// Imports
const Telegraf = require('telegraf')
const { getFileId } = require('./funcs')
const { TesseractWorker } = require('tesseract.js')
const { TOKEN, PORT } = require('./helpers/config')

// Setup
const bot = new Telegraf(TOKEN)
const worker = new TesseractWorker()

// Heroku setup
require('http').createServer().listen(PORT).on('request', function(req, res){
  res.end('')
})

// '/start' command
bot.start(async ctx => {
  await ctx.reply(`Hi ${ctx.from.first_name || 'stranger'}, I am Text Detector.
Send me any picture which contains text and I will return you it's text. English supported only.`)
  // TODO: ERROR LOGGER (Winston)
})

// Photo & document listener
bot.on(['photo', 'document'], async ctx => {
  const fileId = getFileId(ctx.message, ctx.updateSubTypes[0])
  const fileUrl = fileId && await ctx.telegram.getFileLink(fileId)

  ctx.reply('Your image is being processed', { reply_to_message_id: ctx.message.message_id })

  // TODO: ADD LANGUAGE DETECTOR
  worker
    .recognize(fileUrl, 'eng')
    .progress(p => { console.log(p) })
    .then(({ text }) => {
      ctx.reply(text, { reply_to_message_id: ctx.message.message_id })
    })
    .catch(e => {
      ctx.reply('Sorry, we could not recognize text on this image.', { reply_to_message_id: ctx.message.message_id })
    })
})

// '/donate' command
bot.command('donate', async ctx => {
  await ctx.replyWithMarkdown('You can support this bot by donating Bitcoin to that address - `1LxpKwoPb8FPeuvkwADspGZX38Kp6S2cz8`\nYou can watch all the donations [here](https://live.blockcypher.com/btc/address/1LxpKwoPb8FPeuvkwADspGZX38Kp6S2cz8/)')
})

bot.launch()