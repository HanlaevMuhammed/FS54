'use client'
import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight, Rocket, Sparkles, Zap, CheckCircle2 } from 'lucide-react'
import { Button } from '@/src/components/ui/button'

// Обновлённый компонент — футуристичный + строгий стиль, фон с кодом + монитор, эффекты курсора и параллакса.
export default function FastSites54Landing() {
  const portfolio = [
    {
      title: 'Сайт стоматологии',
      images: ['/portfolio/dentl1.png', '/portfolio/dentl2.png', '/portfolio/dentl3.png'],
      url: 'https://dr-smile-nsk.ru',
    },
    {
      title: 'Сайт барбершопа',
      images: ['/portfolio/barber1.jpg', '/portfolio/barber2.jpg', '/portfolio/barber3.jpg'],
      url: 'https://example-barber.ru',
    },
    {
      title: 'Лендинг стартапа',
      images: ['/portfolio/startup1.jpg', '/portfolio/startup2.jpg', '/portfolio/startup3.jpg'],
      url: 'https://example-startup.ru',
    },
  ]

  const [currentIndexes, setCurrentIndexes] = useState(portfolio.map(() => 0))
  const [tilts, setTilts] = useState(portfolio.map(() => ({ x: 0, y: 0 })))
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const glowX = useTransform(cursorX, x => `${x}px`)
  const glowY = useTransform(cursorY, y => `${y}px`)
  const heroRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes(prev => prev.map((index, i) => (index + 1) % portfolio[i].images.length))
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  // Слушаем движение курсора для эффекта glow и параллакса
  useEffect(() => {
    function onMove(e: PointerEvent) {
      const x = e.clientX
      const y = e.clientY
      cursorX.set(x)
      cursorY.set(y)
      document.documentElement.style.setProperty('--cursor-x', `${x}px`)
      document.documentElement.style.setProperty('--cursor-y', `${y}px`)
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [cursorX, cursorY])


  // Tilt для карточек портфолио
  function handleTilt(e: React.MouseEvent<HTMLAnchorElement>, idx: number) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const x = (py - 0.5) * -10 // наклон по X
    const y = (px - 0.5) * 12 // наклон по Y
    setTilts(prev => prev.map((t, i) => (i === idx ? { x, y } : t)))
  }

  function resetTilt(idx: number) {
    setTilts(prev => prev.map((t, i) => (i === idx ? { x: 0, y: 0 } : t)))
  }


  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#07113a] via-[#1a0436] to-[#2a0b2f] text-white min-h-screen font-sans">
      {/* Динамический фон: слои, паттерн кода, монитор-иллюстрация */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Паттерн кода — повторяющаяся SVG/растр (пользователь может заменить /images/code-pattern.svg) */}
        <div className="absolute inset-0 bg-[url('/images/code-pattern.svg')] bg-[length:1400px] opacity-20 mix-blend-overlay animate-bgShift" />

        {/* Световые волны */}
        <motion.div
          className="absolute -left-64 -top-40 w-[900px] h-[900px] rounded-full blur-3xl opacity-30"
          animate={{ x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }}
          style={{ background: 'radial-gradient(circle at 20% 20%, rgba(120,100,255,0.25), rgba(0,0,0,0))' }}
        />

        <motion.div
          className="absolute right-[-250px] top-[-200px] w-[700px] h-[700px] rounded-full blur-2xl opacity-40"
          animate={{ x: [0, -40, 0], y: [0, 20, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror' }}
          style={{ background: 'conic-gradient(from 180deg at 50% 50%, rgba(255,180,80,0.12), rgba(120,80,255,0.08))' }}
        />

        {/* Изображение монитора в правой части (полупрозрачный) */}
        <motion.img
          src="/images/monitor.png"
          alt="monitor-illustration"
          className="absolute right-8 top-70 w-96 max-w-[36rem] opacity-15 mix-blend-screen"
          initial={{ scale: 0.98 }}
          animate={{ scale: [0.98, 1.07, 0.98] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Новая картинка слева */}
        <motion.img
          src="/images/laptop.png"
          alt="laptop-illustration"
          className="absolute left-4 top-85 w-96 max-w-[36rem] opacity-15 mix-blend-screen"
          initial={{ scale: 0.98 }}
          animate={{ scale: [0.98, 1.07, 0.98] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Линии частиц (простые точки) */}
        <div className="absolute inset-0 -z-10">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <g className="opacity-40">
              <circle cx="10%" cy="20%" r="1" fill="rgba(255,255,255,0.6)" />
              <circle cx="30%" cy="70%" r="1" fill="rgba(255,255,255,0.5)" />
              <circle cx="70%" cy="40%" r="1" fill="rgba(255,255,255,0.45)" />
              <circle cx="85%" cy="80%" r="1" fill="rgba(255,255,255,0.35)" />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* Cursor glow */}
      <motion.div
        style={{ left: glowX, top: glowY }}
        className="pointer-events-none fixed w-60 h-60 rounded-full transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen blur-3xl opacity-50 z-50"
        animate={{ opacity: [0.25, 0.6, 0.25] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        aria-hidden
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center text-center py-30 px-6 overflow-hidden"
      >
        {/* Неоновое свечение на фоне */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f1140]/80 via-[#1f1140]/60 to-transparent opacity-90"></div>

        {/* Светящееся неоновое пятно (только левое верхнее) */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ffd86b]/20 blur-3xl rounded-full animate-pulse"></div>

        <div className="relative max-w-5xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold text-transparent mb-12 leading-tight drop-shadow-[0_0_20px_rgba(255,216,107,0.5)]"
            style={{
              backgroundImage: 'linear-gradient(90deg,#ffd86b, #ff6bcb)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              textShadow: '0 6px 30px rgba(255,140,100,0.15)',
            }}
          >
            FastSites54
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8 }}
            className="text-4xl md:text-4xl font-semibold text-white/90 mb-20 drop-shadow-[0_0_12px_rgba(255,216,107,0.4)]"
          >
            Сайты под ключ за 24 часа
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-1"
          >
            Быстро. Технологично. Строго.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-14"
          >
            Делаю сайты, чат-боты и поддержку — в современном, аккуратном стиле.
          </motion.p>

          {/* Кодовая полоса — имитация движущегося кода */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3 max-w-3xl mx-auto shadow-[0_0_40px_-10px_rgba(255,216,107,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,216,107,0.6)] transition-all duration-700"
          >
            <div className="whitespace-nowrap text-left text-sm text-white/70 font-mono leading-6 animate-marquee">
              {`const build = async (project) => { console.log('deploying', project); await deploy(); }
// HTML · CSS · JS · React · Next.js · Supabase · Chatbots · SEO · Performance const build = async (project) => { console.log('deploying', project); await deploy(); }
// HTML · CSS · JS · React · Next.js · Supabase · Chatbots · SEO · Performance
`}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="flex justify-center mt-20"
          >
            <Button
              className="bg-gradient-to-r from-[#ffd86b] via-[#ffb86b] to-[#ff6bcb] text-[#1f1140] font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:scale-110 hover:shadow-[0_0_30px_rgba(255,216,107,0.7)] transition-all duration-500 flex items-center gap-3"
              asChild
            >
              <a
                href="https://t.me/hanlaevm5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Заказать сайт
                <ArrowRight className="w-5 h-5 text-[#1f1140]" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>




      {/* Features Section */}
      <section className="relative z-10 py-12 px-6 max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_-10px_rgba(255,216,107,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,216,107,0.6)] transition-all duration-700">
          {/* Декоративное неоновое кольцо */}
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#ffd86b]/20 blur-2xl animate-pulse"></div>

          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Почему выбирают{" "}
            <span className="text-[#ffd86b] drop-shadow-[0_0_10px_rgba(255,216,107,0.5)]">
              FastSites54
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Rocket size={44} />,
                title: "Скорость",
                desc: "Разработка под ключ — от идеи до запуска за 24 часа.",
              },
              {
                icon: <Sparkles size={44} />,
                title: "Дизайн",
                desc: "Футуристично-строгий визуал, адаптив на всех устройствах.",
              },
              {
                icon: <Zap size={44} />,
                title: "Простота",
                desc: "Чёткий процесс и понятные этапы — минимум согласований.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative p-8 bg-white/10 backdrop-blur-lg rounded-2xl text-center border border-white/10 shadow-[0_0_30px_-10px_rgba(255,216,107,0.3)] hover:shadow-[0_0_40px_-10px_rgba(255,216,107,0.6)] transition-all duration-500"
              >
                {/* Светящийся элемент */}
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#ffd86b]/20 blur-2xl"></div>

                <motion.div
                  className="flex justify-center mb-5 text-[#ffd86b] drop-shadow-[0_0_10px_rgba(255,216,107,0.5)]"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-[0_0_6px_rgba(255,216,107,0.3)]">
                  {item.title}
                </h3>
                <p className="text-white/80 text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* {/* Portfolio Section */}
      <section className="relative z-10 py-26 px-6 max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_-10px_rgba(255,216,107,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,216,107,0.6)] transition-all duration-700">
          {/* Декоративное неоновое кольцо */}
          <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#ffd86b]/20 blur-2xl animate-pulse"></div>

          <h2 className="text-3xl font-bold text-center mb-12 text-[#ffd86b] drop-shadow-[0_0_10px_rgba(255,216,107,0.5)]">
            Портфолио
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((item, i) => {
              const gradientId = `g-${i}`
              return (
                <motion.a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={(e) => handleTilt(e, i)}
                  onMouseLeave={() => resetTilt(i)}
                  whileHover={{ scale: 1.04 }}
                  className="relative overflow-hidden rounded-2xl shadow-[0_0_30px_-10px_rgba(255,216,107,0.3)] hover:shadow-[0_0_50px_-10px_rgba(255,216,107,0.6)] border border-white/10 block transition-all duration-500 cursor-pointer backdrop-blur-md"
                  style={{
                    transform: `perspective(800px) rotateX(${tilts[i].x}deg) rotateY(${tilts[i].y}deg)`,
                  }}
                >
                  <img
                    src={item.images[currentIndexes[i]]}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-700 transform hover:scale-105"
                  />

                  {/* Неоновая рамка */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg
                      className="w-full h-full"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id={gradientId} x1="0" x2="1">
                          <stop offset="0%" stopColor="#ffd86b" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#ff6bcb" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      <rect
                        x="1"
                        y="1"
                        width="98"
                        height="98"
                        rx="4"
                        ry="4"
                        stroke={`url(#${gradientId})`}
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>

                  {/* Подложка с заголовком */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_8px_rgba(255,216,107,0.4)]">
                      {item.title}
                    </h3>
                  </div>
                </motion.a>
              )
            })}
          </div>

          <div className="mt-16 flex justify-center">
            <Button
              className="bg-gradient-to-r from-[#ffd86b] via-[#ffb86b] to-[#ff6bcb] text-[#1f1140] font-bold px-8 py-5 rounded-full shadow-xl hover:scale-110 hover:shadow-[0_0_30px_rgba(255,216,107,0.7)] transition-all duration-500"
              asChild
            >
              <a
                href="https://t.me/fastsites54"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Посмотреть портфолио
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 py-16 px-6 max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_-10px_rgba(255,216,107,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,216,107,0.6)] transition-all duration-700">
          {/* Декоративное неоновое кольцо */}
          <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#ffd86b]/20 blur-2xl animate-pulse"></div>

          <h2 className="text-3xl font-bold text-center mb-10 text-[#ffd86b] drop-shadow-[0_0_10px_rgba(255,216,107,0.5)]">
            Как всё происходит
          </h2>

          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              'Вы пишете мне в Telegram',
              'Присылаете фото и описание бизнеса',
              'Я делаю сайт в течение суток',
              'Получаете готовую ссылку и файлы',
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 shadow-[0_0_20px_-5px_rgba(255,216,107,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,216,107,0.6)] transition-all duration-500"
              >
                <div className="p-3 bg-[#ffd86b]/10 rounded-full">
                  <CheckCircle2 className="text-[#ffd86b] w-6 h-6 drop-shadow-[0_0_6px_rgba(255,216,107,0.7)]" />
                </div>
                <div className="text-lg text-white/90">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/*Prices Section*/}
      <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_-10px_rgba(255,216,107,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,216,107,0.6)] transition-all duration-700">
          {/* Декоративное неоновое кольцо */}
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#ffd86b]/20 blur-2xl animate-pulse"></div>

          <h2 className="text-3xl font-bold text-center mb-12 text-[#ffd86b] drop-shadow-[0_0_10px_rgba(255,216,107,0.5)]">
            Тарифы
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-8">
            {[
              { name: '24 часа', desc: 'Одностраничный сайт-визитка', price: 'от 5 000 ₽', cta: 'Заказать' },
              { name: 'Стандартный', desc: 'Сайты, чат-боты, digital-сервисы', price: 'от 20 000 ₽', cta: 'Заказать' },
              { name: 'Поддержка', desc: 'Обновления, редизайн, оптимизация', price: 'от 3 000 ₽/мес', cta: 'Заказать' },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white/10 text-white/90 p-8 rounded-2xl shadow-[0_0_30px_-10px_rgba(255,216,107,0.3)] hover:shadow-[0_0_40px_-10px_rgba(255,216,107,0.6)] border border-white/10 backdrop-blur-lg transition-all duration-500 w-full md:w-80 text-center"
              >
                {/* Светящийся декоративный элемент */}
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#ffd86b]/20 blur-2xl"></div>

                <h3 className="text-2xl font-semibold mb-3 text-[#ffd86b] drop-shadow-[0_0_8px_rgba(255,216,107,0.4)]">
                  {plan.name}
                </h3>
                <p className="text-sm mb-4 text-white/80">{plan.desc}</p>
                <p className="text-3xl font-bold mb-6 text-white">{plan.price}</p>

                <Button
                  className="bg-gradient-to-r from-[#ffd86b] via-[#ffb86b] to-[#ff6bcb] text-[#1f1140] font-bold px-6 py-3 rounded-full shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(255,216,107,0.7)] transition-all"
                  asChild
                >
                  <a
                    href="https://t.me/hanlaevm5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.cta}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*Connect Section*/}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_-10px_rgba(255,216,107,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,216,107,0.6)] transition-all duration-700">
          {/* Декоративное неоновое кольцо */}
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#ffd86b]/20 blur-2xl animate-pulse"></div>

          <h2 className="text-3xl font-bold text-center mb-3 text-[#ffd86b] drop-shadow-[0_0_10px_rgba(255,216,107,0.5)]">
            Связаться со мной
          </h2>
          <p className="text-center text-white/80 mb-8 text-lg">
            Напишите в Telegram — обсудим ваш проект и запустим быстро.
          </p>

          <div className="flex justify-center gap-5">
            <Button
              className="bg-gradient-to-r from-[#ffd86b] via-[#ffb86b] to-[#ff6bcb] text-[#1f1140] font-bold px-6 py-3 rounded-full shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(255,216,107,0.7)] transition-all"
              asChild
            >
              <a
                href="https://t.me/hanlaevm5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Telegram <ArrowRight className="w-4 h-4" />
              </a>
            </Button>

            <Button
              className="bg-white/10 text-white px-6 py-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 transition-all"
              asChild
            >
              <a
                href="mailto:hanlaevm5@gmail.com"
                className="flex items-center gap-2"
              >
                Email <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="relative z-10 py-6 px-8 text-white/60 border-t border-white/10 mt-8 flex items-center justify-center text-center">
        {/* Центровой блок */}
        <div className="text-center">
          <p>Все права защищены</p>
          <p>© 2025 FastSites54</p>
        </div>

        {/* Правая часть */}
        <p className="absolute right-8 text-sm md:text-base text-right">
          Сайт разработан:{' '}
          <a
            href="https://t.me/hanlaevm5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#ffd86b] transition-colors"
          >
            @hanlaevm5
          </a>
        </p>
      </footer>



      {/* Встроенные стили (анимации) — tailwind + небольшие кастомные классы */}
      <style jsx>{`
        .animate-bgShift {
          animation: bgShift 24s ease-in-out infinite;
          background-position: 0% 0%;
        }
        @keyframes bgShift {
          0% { background-position: 0% 0%; }
          50% { background-position: 50% 100%; }
          100% { background-position: 0% 0%; }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 12s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        /* Плавный градиент для текста */
        h1{letter-spacing: -1px}

        /* Мелкие оптимизации для мобильных */
        @media (max-width: 768px) {
          .animate-marquee{ font-size: 12px }
        }
      `}</style>
    </div>
  )
}
