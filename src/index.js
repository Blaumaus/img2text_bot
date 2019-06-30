// TODO: REFACTOR
// TODO: REWRITE TO DECLARATIVE STYLE WHERE POSSIBLE
// TODO: REWRITE TO ES6 STYLE

require('dotenv').config()
const Telegraf = require('telegraf')
const { Markup } = Telegraf
const bot = new Telegraf(process.env.BOT_TOKEN)
const { getFileId } = require('./funcs')
const { TesseractWorker } = require('tesseract.js')
const worker = new TesseractWorker()

bot.start(async ctx => {
  await ctx.reply(`Hi ${ctx.from.first_name || 'stranger'}, I am Text Detector.
Send me any picture which contains text and I will return you it's text. English supported only.`)
  // TODO: ERROR LOGGER (Winston)
})

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

bot.command('donate', async ctx => {
  await ctx.replyWithMarkdown('You can support this bot by donating Bitcoin to that address - `1LxpKwoPb8FPeuvkwADspGZX38Kp6S2cz8`')
})

bot.launch()