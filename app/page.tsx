'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, Activity, Code, Laptop, Menu, X } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'

export default function FullLanding() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // 🌧 Анимация дождя символов
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Более “кодовые” символы
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const fontSize = 16
    let columns = Math.floor(window.innerWidth / fontSize)
    let drops = Array(columns).fill(0)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / fontSize)
      drops = Array(columns).fill(0)
    }
    resize()
    window.addEventListener('resize', resize)

    let animationFrameId: number
    let lastTime = 0
    const fps = 20 // частота кадров (меньше = медленнее)
    const frameInterval = 1000 / fps

    const draw = (time = 0) => {
      const delta = time - lastTime
      if (delta > frameInterval) {
        lastTime = time

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#00d0ffff' // зелёный “матрицный” код
        ctx.font = fontSize + 'px monospace'

        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          // медленнее падение
          drops[i] += Math.random() * 0.5 + 0.2

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])


  const navLinks = [
    { name: 'Главная', href: '#hero' },
    { name: 'Преимущества', href: '#features' },
    { name: 'Процесс', href: '#process' },
    { name: 'Тарифы', href: '#tariffs' },
    { name: 'Контакты', href: '#contacts' },
  ]

  const features = [
    { title: 'Скорость', desc: 'Быстро — не значит поверхностно. Мы делаем сайты приносящие результат.', icon: <Zap className="w-8 h-8 text-cyan-500 mx-auto" /> },
    { title: 'Дизайн', desc: 'Современный стиль и чёткий фокус на тех, кто важен вашему бизнесу.', icon: <Laptop className="w-8 h-8 text-cyan-500 mx-auto" /> },
    { title: 'Рост бизнеса', desc: 'Мы создаём сайты, которые не только впечатляют, но и приносят прибыль.', icon: <Activity className="w-8 h-8 text-cyan-500 mx-auto" /> },
    { title: 'Чистота кода', desc: 'Быстрая загрузка, гибкость, лёгкое масштабирование.', icon: <Code className="w-8 h-8 text-cyan-500 mx-auto" /> },
  ]

  const processSteps = [
    'Свяжитесь с нами в Telegram',
    'Опишите ваш бизнес и идеи',
    'Мы разработаем сайт за 24 часа',
    'Вы получаете готовый сайт и доступы',
  ]

  const tariffs = [
    { name: 'Старт', oldPrice: '14 990 ₽', price: '14 990 ₽', desc: 'Современный сайт для старта бизнеса: до 3 страниц, адаптивный дизайн, настройка домена и хостинга' },
    { name: 'Продвинутый', oldPrice: '27 990 ₽', price: '19 990 ₽', desc: 'Функциональный сайт с анимациями и оптимизацией: до 10 страниц, подключение аналитики и интеграций' },
    { name: 'Проект под Ключ', oldPrice: '44 990 ₽', price: 'от 44 990 ₽', desc: 'Индивидуальный проект под ключ: уникальный дизайн, фирменный стиль, сопровождение и техническая поддержка' },
  ]

  const codeLines = [
    "const website = createWebsite({",
    "  speed: 'fast',",
    "  design: 'modern',",
    "  sales: true,",
    "  responsive: true,",
    "});",
    "await website.launch();",
    "console.log('Ваш сайт запущен');",
  ]
  const [typedCode, setTypedCode] = useState<string[]>([])

  // эффект машинки
  useEffect(() => {
    let lineIndex = 0
    let charIndex = 0
    const type = () => {
      setTypedCode(prev => {
        const newLines = [...prev]
        if (!newLines[lineIndex]) newLines[lineIndex] = ''
        newLines[lineIndex] += codeLines[lineIndex][charIndex]
        return newLines
      })
      charIndex++
      if (charIndex >= codeLines[lineIndex].length) {
        charIndex = 0
        lineIndex++
        if (lineIndex >= codeLines.length) {
          lineIndex = 0
          setTypedCode([])
        }
      }
      setTimeout(type, 60)
    }
    type()
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  return (
    <div className="relative bg-white text-gray-900 font-sans overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-6 md:py-10">

          {/* Логотип */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center cursor-pointer"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              FastSites54
            </h1>
            <span className="text-xs sm:text-sm text-gray-600 mt-1 tracking-wide opacity-80">
              by Hanlaev&nbsp;&amp;&nbsp;Partners
            </span>
          </motion.div>

          {/* Навигация */}
          <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            {navLinks.map((link, i) => (
              <motion.a key={i} href={link.href} className="relative group">
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>

          {/* Кнопка и бургер */}
          <div className="flex flex-col items-center gap-3">
            {/* Телефон и кнопка видны только на больших экранах */}
            <a
              href="tel:+79137717944"
              className="hidden lg:block text-gray-700 text-lg font-semibold hover:text-cyan-600 transition-colors"
            >
              +7 (913) 771-79-44
            </a>

            <Button
              className="hidden lg:inline bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white px-8 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-transform text-xl font-semibold"
              asChild
            >
              <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer">
                Заказать сайт
              </a>
            </Button>

            {/* 📱 Бургер до 1024 px включительно */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-700 p-2 mt-2 rounded-lg hover:bg-gray-100 transition-colors active:opacity-70"
              aria-label="Открыть меню"
            >
              {menuOpen ? <X size={24} strokeWidth={1.8} /> : <Menu size={24} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100 md:hidden"
            >
              <div className="flex flex-col items-center py-6 gap-6 text-lg text-gray-800 font-medium">
                {navLinks.map((link, i) => (
                  <a key={i} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-cyan-600 transition-colors">
                    {link.name}
                  </a>
                ))}

                <a href="tel:+79137717944" className="text-gray-700 text-lg font-semibold hover:text-cyan-600 transition-colors">
                  +7 (913) 771-79-44
                </a>

                <Button
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-transform text-base font-semibold"
                  asChild
                >
                  <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer">
                    Заказать сайт
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>




      {/* Hero Section */}
      <section id="hero" className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-12 max-w-4xl shadow-xl text-center mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-15 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
          >
            Любой бизнес начинается с сайта!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-700 mb-15"
          >
            Мы занимаемся разработкой современных сайтов, digital-сервисов и ботов для бизнеса — быстро, красиво и с фокусом на результат.
            Ваш сайт - инструмент, который работает 24/7 и продает.
          </motion.p>
          <Button
            className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white text-2xl font-semibold px-15 py-6 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-2 mx-auto"
            asChild
          >
            <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer">
              Заказать сайт
            </a>
          </Button>

        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="bg-white p-6 rounded-2xl shadow-sm mx-auto"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600">{f.title}</h3>
              <p className="text-gray-700">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative z-10 py-20 px-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-cyan-500">Как мы работаем</h2>

          <div className="flex flex-col items-center space-y-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm text-gray-700 hover:shadow-md hover:translate-x-1 transition-all flex items-start text-left w-full max-w-xl"
              >
                <span className="font-semibold text-cyan-500 w-37.5 text-right mr-3 flex-shrink-0">
                  {i + 1}.
                </span>
                <p className="flex-1">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Tariffs Section */}
      <section id="tariffs" className="relative z-10 py-20 px-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold mb-12 text-cyan-500">Тарифы</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {tariffs.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}
                className="bg-gray-50 p-8 rounded-2xl shadow-sm mx-auto transition-transform"
              >
                <h3 className="text-xl font-bold mb-2 text-cyan-600">{t.name}</h3>
                <p className="text-gray-700 mb-4">{t.desc}</p>

                {/* Цена со скидкой */}
                <div className="mb-6">
                  {/* {t.oldPrice && ( //СКИДКИ.....NEWYear...............................................................
                    <span className="text-gray-400 line-through text-lg mr-2">
                      {t.oldPrice}
                    </span>
                  )} */}
                  <span className="text-2xl font-semibold text-gray-900">
                    {t.price}
                  </span>
                </div>

                <Button
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white px-6 py-3 rounded-full mx-auto"
                  asChild
                >
                  <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer">
                    Выбрать
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Live Code Section */}
      <section className="relative z-10 py-15 px-6 mx-6 mb-1">
        <div className="bg-white rounded-2xl p-6 shadow-xl overflow-hidden w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-cyan-500 text-center">
            Уже начали разрабатывать ваш сайт:)
          </h2>
          <div
            ref={(el) => {
              if (el) el.scrollTop = el.scrollHeight
            }}
            className="bg-white text-green-500 font-mono text-left p-4 rounded-xl overflow-y-auto h-63 shadow-inner"
          >
            <pre className="whitespace-pre-wrap">
              {typedCode.map((line, idx) => (
                <span key={idx}>{line}{'\n'}</span>
              ))}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block"
              >
                ▌
              </motion.span>
            </pre>
          </div>
        </div>
      </section>


      <section id="contacts" className="relative z-10 py-20 px-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-cyan-500">
            Готовы запустить сайт уже завтра?
          </h2>
          <p className="text-gray-700 mb-6">
            Напишите нам прямо сейчас, и мы обсудим ваш проект.
          </p>

          {/* Основная кнопка Telegram */}
          <Button
            className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white px-8 py-4 rounded-full shadow-md hover:scale-105 hover:shadow-2xl transition-all mx-auto"
            asChild
          >
            <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer">
              Написать в Telegram
            </a>
          </Button>

          {/* Социальные иконки */}
          <div className="flex justify-center gap-6 mt-6">
            <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <FaTelegramPlane className="w-6 h-6 text-cyan-500 hover:text-blue-400 transition-colors" />
            </a>
            <a href="https://wa.me/79137717944" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="w-6 h-6 text-green-500 hover:text-green-400 transition-colors" />
            </a>
          </div>

          {/* Гарантия ответа */}
          <p className="text-gray-400 mt-4 text-sm">
            Отвечаем в течение 1 часа.
          </p>


          {/* Альтернативные контакты */}
          <p className="text-gray-500 mt-4 text-sm">
            Или свяжитесь по email: <a href="mailto:info@site.ru" className="text-cyan-500 underline">hanlaevm5@gmail.com</a>
            <br />
            или по телефону: <a href="tel:+79137717944" className="text-cyan-500 underline">+7 (913) 771-79-44</a>
          </p>
        </div>
      </section>


      <footer className="relative z-10 py-12 px-6 text-gray-500 text-center border-t border-gray-200 bg-white">
        <p>© 2025 FastSites54. Все права защищены.</p>
        <p>
          Сайт разработан: <a href="https://t.me/hanlaevm5" className="text-cyan-500 hover:underline">@hanlaevm5</a>
        </p>
      </footer>
    </div>
  )
}
