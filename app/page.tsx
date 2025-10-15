'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, Activity, Code, Laptop, Menu, X } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'

export default function FullLanding() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [typedCode, setTypedCode] = useState<string[]>([])

  // Скролл к началу при хэше
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'instant' })
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
    { name: 'Старт', discount: false, price: '14 990 ₽', desc: 'Современный сайт для старта бизнеса: до 3 страниц, адаптивный дизайн, настройка домена и хостинга' },
    { name: 'Продвинутый', discount: true, oldPrice: '29 990 ₽', price: '19 990 ₽', desc: 'Функциональный сайт с анимациями и оптимизацией: до 10 страниц, подключение аналитики и интеграций' },
    { name: 'Проект под Ключ', discount: false, price: 'от 44 990 ₽', desc: 'Индивидуальный проект под ключ: уникальный дизайн, фирменный стиль, сопровождение и техническая поддержка' },
  ]

  return (
    <div className="relative bg-white text-gray-900 font-sans overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-6 md:py-5">
          {/* Логотип */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center text-center cursor-pointer">
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
            <a href="tel:+79137717944" className="hidden lg:block text-gray-700 text-lg font-semibold hover:text-cyan-600 transition-colors">
              +7 (913) 771-79-44
            </a>
            <Button className="hidden lg:inline bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white px-8 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-transform text-xl font-semibold" asChild>
              <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer">Заказать сайт</a>
            </Button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-700 p-2 mt-2 rounded-lg hover:bg-gray-100 transition-colors active:opacity-70" aria-label="Открыть меню">
              {menuOpen ? <X size={24} strokeWidth={1.8} /> : <Menu size={24} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.3 }} className="absolute left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100 md:hidden">
              <div className="flex flex-col items-center py-6 gap-6 text-lg text-gray-800 font-medium">
                {navLinks.map((link, i) => (
                  <a key={i} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-cyan-600 transition-colors">
                    {link.name}
                  </a>
                ))}
                <a href="tel:+79137717944" className="text-gray-700 text-lg font-semibold hover:text-cyan-600 transition-colors">
                  +7 (913) 771-79-44
                </a>
                <Button className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-transform text-base font-semibold" asChild>
                  <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer">Заказать сайт</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-4 overflow-hidden"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* --- Контент --- */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 max-w-3xl shadow-xl text-center mx-auto border border-white/50">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-sm">
            Любой бизнес начинается с сайта!
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Мы занимаемся разработкой современных сайтов, digital-сервисов и ботов для бизнеса — быстро, красиво и с фокусом на результат.
            Ваш сайт — инструмент, который работает 24/7 и продает.
          </p>
          <Button
            className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white text-2xl font-semibold px-15 py-6 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-2 mx-auto"
            asChild
          >
            <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer">
              Заказать сайт
            </a>
          </Button>
        </div>
      </section>



      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 py-20 px-6 max-w-6xl mx-auto text-center overflow-hidden"
      >

        <motion.div
          className="relative grid md:grid-cols-4 gap-8 text-center"
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
              className="bg-white/85 backdrop-blur-xl p-6 rounded-2xl shadow-sm mx-auto border border-white/50"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-600">{f.title}</h3>
              <p className="text-gray-700">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* Process Section */}
      <section
        id="process"
        className="relative z-10 py-20 px-4 sm:px-6 overflow-hidden"
        style={{
          backgroundImage: `url('/process-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative bg-white/93 rounded-3xl shadow-xl p-8 max-w-4xl mx-auto text-center border border-white/40">
          <h2 className="text-3xl font-bold mb-12 text-cyan-500">Как мы работаем</h2>

          <div className="flex flex-col items-center space-y-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-gray-50/80 backdrop-blur-md p-6 rounded-3xl shadow-sm text-gray-700 hover:shadow-md hover:translate-x-1 transition-all flex items-start text-left w-full max-w-xl border border-white/40"
              >
                <span className="font-semibold text-cyan-500 sm:text-2xl w-6 text-right mr-3 flex-shrink-0">
                  {i + 1}.
                </span>
                <p className="flex-1 sm:text-xl leading-relaxed">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Tariffs Section */}
      <section
        id="tariffs"
        className="relative z-10 py-20 px-6 overflow-hidden max-w-6xl mx-auto text-center"
      >
        <div className="relative bg-white/85 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/40">
          <h2 className="text-3xl font-bold mb-12 text-cyan-500">Тарифы</h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {},
            }}
          >
            {tariffs.map((t, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="relative bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm mx-auto border border-white/40 transition-all overflow-hidden"
              >
                {/*"СКИДКА" (включается по флагу t.discount) */}
                {t.discount && (
                  <div className="absolute top-4 left-[-75px] w-[240px] text-center 
              bg-gradient-to-r from-rose-600 via-red-500 to-orange-400 
              text-white text-[13px] font-semibold py-2 rotate-[-40deg] 
              shadow-[0_6px_20px_rgba(255,0,0,0.25)] 
              uppercase tracking-[0.2em] z-20 
              border-t border-b border-white/30 
              backdrop-blur-sm 
              before:absolute before:inset-0 before:bg-white/15 before:blur-[2px] before:opacity-60 before:content-[''] 
              hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,100,100,0.35)] transition-all duration-500 ease-out
            ">
                    %SALE
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2 text-cyan-600">{t.name}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{t.desc}</p>

                <div className="mb-4">
                  {t.oldPrice && (
                    <span className="text-gray-400 line-through text-lg mr-2">
                      {t.oldPrice}
                    </span>
                  )}
                  <span className="text-2xl font-semibold text-gray-900">
                    {t.price}
                  </span>
                </div>

                <Button
                  className="mt-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white px-6 py-3 rounded-full mx-auto hover:scale-105 hover:shadow-lg transition-transform"
                  asChild
                >
                  <a
                    href="https://t.me/manager_fs54"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Выбрать
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>





      <section
        id="contacts"
        className="relative z-10 py-20 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: `url('/contacts-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >


        <div className="relative bg-white/93 p-10 rounded-3xl shadow-xl w-full max-w-3xl mx-auto border border-white/40">
          <h2 className="text-3xl font-bold mb-6 text-cyan-500">
            Готовы запустить сайт уже завтра?
          </h2>
          <p className="text-gray-700 mb-6">
            Напишите нам прямо сейчас, и мы обсудим ваш проект.
          </p>

          <Button
            className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white px-12 py-6 rounded-full text-xl shadow-md hover:scale-105 hover:shadow-2xl transition-all mx-auto"
            asChild
          >
            <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer">
              Написать в Telegram
            </a>
          </Button>

          <div className="flex justify-center gap-6 mt-6">
            <a href="https://t.me/manager_fs54" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <FaTelegramPlane className="w-6 h-6 text-cyan-500 hover:text-blue-400 transition-colors" />
            </a>
            <a href="https://wa.me/79137717944" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="w-6 h-6 text-green-500 hover:text-green-400 transition-colors" />
            </a>
          </div>

          <p className="text-gray-400 mt-4 text-sm">Отвечаем в течение 1 часа.</p>

          <p className="text-gray-500 mt-4 text-sm">
            Или свяжитесь по email: <a href="mailto:hanlaevm5@gmail.com" className="text-cyan-500 underline">hanlaevm5@gmail.com</a>
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
