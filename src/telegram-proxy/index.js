// import 'dotenv/config'
// import express from 'express'
// import cors from 'cors'

// const app = express()
// app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }))
// app.use(express.json({ limit: '10kb' }))

// const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// const TOKEN = process.env.TELEGRAM_BOT_TOKEN
// const CHAT_ID = process.env.TELEGRAM_CHAT_ID

// console.log('Token loaded:', TOKEN ? `yes (${TOKEN.slice(0, 6)}...)` : 'NO')
// console.log('Chat ID loaded:', CHAT_ID ? CHAT_ID : 'NO')

// app.post('/api/contact', async (req, res) => {
//   const { name, email, message } = req.body || {}
//   if (!name || !email || !message) return res.status(400).json({ ok: false })

//   const text =
//     `📩 <b>សារថ្មីពីគេហទំព័រ</b>\n\n` +
//     `👤 <b>ឈ្មោះ៖</b> ${esc(name).slice(0, 100)}\n` +
//     `📧 <b>អ៊ីមែល៖</b> ${esc(email).slice(0, 100)}\n` +
//     `💬 <b>សារ៖</b>\n${esc(message).slice(0, 2000)}`

//   try {
//     const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' })
//     })
//     const data = await r.json()
//     if (!data.ok) console.error('Telegram error:', data)
//     res.status(data.ok ? 200 : 502).json({ ok: data.ok })
//   } catch (err) {
//     console.error('Server error:', err)
//     res.status(500).json({ ok: false })
//   }
// })

// app.listen(process.env.PORT || 3000, () => console.log('Proxy running'))

import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }))
app.use(express.json({ limit: '10kb' }))

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

console.log('Token loaded:', TOKEN ? `yes (${TOKEN.slice(0, 6)}...)` : 'NO')
console.log('Chat ID loaded:', CHAT_ID ? CHAT_ID : 'NO')

// ====================================================
// ១. API សម្រាប់ទទួល Form ពី Website បាញ់ចូល Telegram
// ====================================================
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}
  if (!name || !email || !message) return res.status(400).json({ ok: false })

  const text =
    `📩 <b>សារថ្មីពីគេហទំព័រ</b>\n\n` +
    `👤 <b>ឈ្មោះ៖</b> ${esc(name).slice(0, 100)}\n` +
    `📧 <b>អ៊ីមែល៖</b> ${esc(email).slice(0, 100)}\n` +
    `💬 <b>សារ៖</b>\n${esc(message).slice(0, 2000)}`

  try {
    const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' })
    })
    const data = await r.json()
    if (!data.ok) console.error('Telegram error:', data)
    res.status(data.ok ? 200 : 502).json({ ok: data.ok })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ ok: false })
  }
})

// ====================================================
// ២. Webhook សម្រាប់ទទួលសារពេល Admin Reply ក្នុង Telegram
// ====================================================
app.post('/api/telegram-webhook', async (req, res) => {
  try {
    const update = req.body

    // ពិនិត្យមើលថាតើ Admin កំពុង Reply លើសារចាស់ក្នុង Telegram ឬទេ
    if (update.message && update.message.reply_to_message) {
      const originalText = update.message.reply_to_message.text || ''
      const adminReply = update.message.text

      // ស្កេនទាញយក Email Customer ពីសារចាស់ (ស្វែងរកអក្សរ អ៊ីមែល៖ ឬ Email:)
      const emailMatch = originalText.match(/(?:អ៊ីមែល៖|Email:)\s*([^\n]+)/i)

      if (emailMatch) {
        const customerEmail = emailMatch[1].trim()

        console.log(`✉️ ត្រៀមផ្ញើ Email ឆ្លើយតបទៅកាន់: ${customerEmail}`)
        console.log(`💬 ខ្លឹមសារ Reply របស់ Admin: ${adminReply}`)

        // 💡 ត្រង់នេះ៖ អ្នកអាចប្រើប្រាស់ Nodemailer ឬ Resend API ដើម្បីបាញ់ Email ទៅ Customer ពិតប្រាកដ
      }
    }
    return res.status(200).send('OK')
  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(500).json({ ok: false })
  }
})

app.listen(process.env.PORT || 3000, () => console.log('Proxy running'))