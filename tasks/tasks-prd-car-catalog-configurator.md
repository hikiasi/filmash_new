# Task List: Каталог автомобилей с конфигуратором

## Relevant Files

### Database & Schema
- `prisma/schema.prisma` - Database schema definition with all tables (brands, models, trims, colors, wheels, interiors, additional_options, inquiries, currency_rates)
- `prisma/migrations/` - Database migration files
- `prisma/seed.ts` - Seed data for development and testing

### API Routes
- `app/api/catalog/route.ts` - API для получения каталога автомобилей с фильтрацией
- `app/api/catalog/[modelId]/route.ts` - API для получения детальной информации о модели
- `app/api/configurator/[trimId]/route.ts` - API для получения данных конфигуратора (цвета, диски, интерьеры, опции)
- `app/api/inquiries/route.ts` - API для создания заявок
- `app/api/currency/route.ts` - API для получения/обновления курсов валют
- `app/api/upload/route.ts` - API для загрузки изображений

### Components - Catalog
- `components/catalog/CatalogGrid.tsx` - Сетка карточек автомобилей
- `components/catalog/CarCard.tsx` - Карточка автомобиля в каталоге
- `components/catalog/CatalogFilters.tsx` - Компонент фильтров
- `components/catalog/CatalogSearch.tsx` - Компонент поиска
- `components/catalog/CatalogSort.tsx` - Компонент сортировки

### Components - Configurator
- `components/configurator/ConfiguratorLayout.tsx` - Основной layout конфигуратора
- `components/configurator/ImageGallery.tsx` - Галерея изображений с главным фото
- `components/configurator/TrimSelector.tsx` - Селектор модификации
- `components/configurator/ColorSelector.tsx` - Селектор цвета кузова
- `components/configurator/WheelSelector.tsx` - Селектор дисков
- `components/configurator/InteriorSelector.tsx` - Селектор интерьера
- `components/configurator/AdditionalOptions.tsx` - Список дополнительных опций
- `components/configurator/PriceDisplay.tsx` - Отображение итоговой цены
- `components/configurator/SpecificationsAccordion.tsx` - Аккордеон с характеристиками
- `components/configurator/InquiryForm.tsx` - Форма заявки

### Components - Shared
- `components/ui/` - shadcn/ui компоненты (button, input, select, dialog, accordion, etc.)
- `components/shared/PriceFormatter.tsx` - Компонент для форматирования цен в двух валютах
- `components/shared/ImageOptimized.tsx` - Оптимизированный компонент изображения

### Pages
- `app/catalog/page.tsx` - Страница каталога
- `app/catalog/[brand]/[model]/page.tsx` - Страница конфигуратора конкретной модели

### Utils & Helpers
- `lib/db.ts` - Prisma client initialization
- `lib/validations/inquiry.ts` - Zod схемы валидации для заявок
- `lib/validations/filters.ts` - Zod схемы валидации для фильтров
- `lib/utils/currency.ts` - Утилиты для работы с валютами и курсами
- `lib/utils/price-calculator.ts` - Калькулятор итоговой цены конфигурации
- `lib/utils/image-upload.ts` - Утилиты для загрузки и обработки изображений
- `lib/services/email.ts` - Сервис отправки email уведомлений
- `lib/services/currency-api.ts` - Сервис получения курсов валют с API ЦБ РФ

### State Management
- `lib/store/configurator-store.ts` - Zustand store для состояния конфигуратора
- `lib/hooks/use-catalog-filters.ts` - Hook для работы с фильтрами каталога
- `lib/hooks/use-configurator.ts` - Hook для работы с конфигуратором
- `lib/hooks/use-currency.ts` - Hook для работы с курсами валют

### Types
- `types/database.ts` - TypeScript типы для моделей БД
- `types/configurator.ts` - TypeScript типы для конфигуратора
- `types/catalog.ts` - TypeScript типы для каталога

### Configuration
- `.env.example` - Пример файла с переменными окружения
- `next.config.js` - Конфигурация Next.js (настройки изображений, etc.)
- `tailwind.config.ts` - Конфигурация Tailwind с фирменными цветами

### Tests
- `__tests__/api/catalog.test.ts` - Тесты API каталога
- `__tests__/api/inquiries.test.ts` - Тесты API заявок
- `__tests__/components/CarCard.test.tsx` - Тесты компонента карточки
- `__tests__/utils/price-calculator.test.ts` - Тесты калькулятора цен
- `__tests__/utils/currency.test.ts` - Тесты утилит валют

### Notes
- Использовать Next.js 14+ App Router
- Все компоненты должны быть типизированы с TypeScript
- Применять серверные компоненты где возможно
- Для форм использовать React Hook Form + Zod
- Для анимаций использовать Framer Motion
- Тесты запускать через: `npx jest [optional/path/to/test/file]`

## Tasks

- [ ] 1.0 Настройка проекта и базовой инфраструктуры
  - [x] 1.1 Инициализировать Next.js 14+ проект с TypeScript и App Router (`npx create-next-app@latest filmash-catalog --typescript --tailwind --app`)
  - [x] 1.2 Установить зависимости: `npm install @prisma/client prisma zod react-hook-form @hookform/resolvers framer-motion lucide-react @radix-ui/react-* zustand @tanstack/react-query`
  - [x] 1.3 Установить shadcn/ui: `npx shadcn-ui@latest init` и добавить необходимые компоненты (button, input, select, dialog, accordion, checkbox, slider, label, form)
  - [x] 1.4 Настроить Tailwind config с фирменными цветами Филмаш (#CFF902, #4380C2)
  - [x] 1.5 Создать структуру папок проекта согласно списку Relevant Files
  - [x] 1.6 Настроить `.env.example` с необходимыми переменными окружения (DATABASE_URL, NEXT_PUBLIC_API_URL, EMAIL_*, CURRENCY_API_KEY)
  - [x] 1.7 Настроить `next.config.js` для оптимизации изображений (domains, formats, sizes)
  - [x] 1.8 Создать базовый layout с header и footer
  - [x] 1.9 Настроить ESLint и Prettier для code style
  - [x] 1.10 Инициализировать Git репозиторий и создать `.gitignore`

- [ ] 2.0 Настройка базы данных PostgreSQL и Prisma ORM
  - [x] 2.1 Установить и настроить PostgreSQL локально или через Docker
  - [x] 2.2 Инициализировать Prisma: `npx prisma init`
  - [x] 2.3 Создать schema.prisma с моделью Brand (id, name, logo_url, country_of_origin, created_at, updated_at)
  - [x] 2.4 Создать модель Model (id, brand_id, name, body_type, year, description, created_at, updated_at) с relation к Brand
  - [ ] 2.5 Создать модель Trim (id, model_id, name, base_price_cny, base_price_rub, specifications JSONB, created_at, updated_at) с relation к Model
  - [ ] 2.6 Создать модель Color (id, trim_id, name, hex_code, image_url, is_premium, additional_price_cny, additional_price_rub, created_at) с relation к Trim
  - [ ] 2.7 Создать модель Wheel (id, trim_id, name, size, image_url, additional_price_cny, additional_price_rub, created_at) с relation к Trim
  - [ ] 2.8 Создать модель Interior (id, trim_id, name, material, image_url, additional_price_cny, additional_price_rub, created_at) с relation к Trim
  - [ ] 2.9 Создать модель AdditionalOption (id, trim_id, name, description, is_paid, price_cny, price_rub, category, created_at) с relation к Trim
  - [ ] 2.10 Создать модель Inquiry (id, trim_id, color_id, wheels_id, interior_id, selected_options JSONB, customer_name, customer_phone, customer_email, total_price_cny, total_price_rub, status enum, configuration_snapshot JSONB, notes, created_at, updated_at)
  - [ ] 2.11 Создать модель CurrencyRate (id, rate_cny_to_rub, source, is_manual_override, valid_from, created_at)
  - [ ] 2.12 Добавить индексы для оптимизации запросов (brand_id, model_id, trim_id, status)
  - [ ] 2.13 Создать первую миграцию: `npx prisma migrate dev --name init`
  - [ ] 2.14 Создать `lib/db.ts` с инициализацией Prisma Client (singleton pattern)
  - [ ] 2.15 Создать seed скрипт `prisma/seed.ts` с тестовыми данными (минимум 3 бренда, 5 моделей, 15 модификаций)
  - [ ] 2.16 Запустить seed: `npx prisma db seed`
  - [ ] 2.17 Создать TypeScript типы из Prisma schema: `npx prisma generate`

- [ ] 3.0 Реализация API для каталога автомобилей
  - [ ] 3.1 Создать `types/catalog.ts` с интерфейсами CatalogItem, CatalogFilters, CatalogResponse
  - [ ] 3.2 Создать Zod схемы валидации в `lib/validations/filters.ts` (brand[], bodyType[], priceRange, powerRange, driveType[], engineType[])
  - [ ] 3.3 Создать `app/api/catalog/route.ts` с GET endpoint для получения каталога
  - [ ] 3.4 Реализовать логику фильтрации в API: по марке, типу кузова, диапазону цен (базовая цена минимальной модификации)
  - [ ] 3.5 Реализовать логику фильтрации: по мощности (из specifications), по типу привода, по типу двигателя
  - [ ] 3.6 Реализовать поиск по названию марки и модели (case-insensitive, частичное совпадение)
  - [ ] 3.7 Реализовать сортировку: по цене (asc/desc), по мощности, по году, по названию
  - [ ] 3.8 Добавить пагинацию с параметрами skip и take (default: 12 items)
  - [ ] 3.9 Оптимизировать запрос: использовать select для получения только нужных полей, include для relations
  - [ ] 3.10 Добавить подсчет общего количества результатов для пагинации
  - [ ] 3.11 Форматировать ответ: группировать по моделям, включать минимальную цену, основное изображение, краткие характеристики
  - [ ] 3.12 Добавить error handling и возврат соответствующих HTTP статусов
  - [ ] 3.13 Создать `app/api/catalog/[modelId]/route.ts` для получения детальной информации о модели (все модификации)

- [ ] 4.0 Создание UI компонентов каталога
  - [ ] 4.1 Создать `types/database.ts` с TypeScript типами на основе Prisma моделей
  - [ ] 4.2 Создать `components/shared/PriceFormatter.tsx` - компонент для отображения цены в двух валютах (₽ / ¥)
  - [ ] 4.3 Создать `components/catalog/CarCard.tsx` - карточка автомобиля с изображением, названием, ценой от, годом, краткими характеристиками
  - [ ] 4.4 Добавить hover эффекты на CarCard (scale, shadow) через Framer Motion
  - [ ] 4.5 Добавить Link на страницу конфигуратора в CarCard
  - [ ] 4.6 Создать `components/catalog/CatalogGrid.tsx` - сетка карточек с responsive layout (1 колонка на mobile, 2 на tablet, 3-4 на desktop)
  - [ ] 4.7 Реализовать infinite scroll в CatalogGrid используя Intersection Observer API
  - [ ] 4.8 Добавить skeleton loading состояние для карточек
  - [ ] 4.9 Создать `app/catalog/page.tsx` - главная страница каталога
  - [ ] 4.10 Интегрировать React Query для fetching данных каталога с кэшированием (staleTime: 5 минут)
  - [ ] 4.11 Добавить состояние загрузки и обработку ошибок на странице каталога
  - [ ] 4.12 Настроить SEO мета-теги для страницы каталога

- [ ] 5.0 Реализация системы фильтрации и поиска
  - [ ] 5.1 Создать `lib/hooks/use-catalog-filters.ts` - custom hook для управления состоянием фильтров
  - [ ] 5.2 Реализовать синхронизацию фильтров с URL query parameters (useSearchParams)
  - [ ] 5.3 Создать `components/catalog/CatalogSearch.tsx` - поиск с debounce (300ms) и автодополнением
  - [ ] 5.4 Создать `components/catalog/CatalogFilters.tsx` - панель фильтров с shadcn компонентами
  - [ ] 5.5 Реализовать фильтр по маркам (Checkbox группа с логотипами)
  - [ ] 5.6 Реализовать фильтр по типу кузова (Checkbox группа)
  - [ ] 5.7 Реализовать фильтр по цене (Range Slider от-до в рублях)
  - [ ] 5.8 Реализовать фильтр по мощности (Range Slider от-до)
  - [ ] 5.9 Реализовать фильтр по типу привода (Radio Group: передний/задний/полный)
  - [ ] 5.10 Реализовать фильтр по типу двигателя (Checkbox группа: электро/бензин/гибрид)
  - [ ] 5.11 Добавить кнопку "Сбросить фильтры"
  - [ ] 5.12 Добавить счетчик активных фильтров
  - [ ] 5.13 Создать `components/catalog/CatalogSort.tsx` - выпадающий список сортировки
  - [ ] 5.14 Реализовать адаптивность фильтров (drawer на mobile, sidebar на desktop)
  - [ ] 5.15 Добавить отображение количества найденных результатов
  - [ ] 5.16 Оптимизировать производительность: debounce для фильтров, мемоизация компонентов

- [ ] 6.0 Реализация API конфигуратора
  - [ ] 6.1 Создать `types/configurator.ts` с интерфейсами ConfiguratorData, SelectedConfiguration, ConfigurationSnapshot
  - [ ] 6.2 Создать `app/api/configurator/[trimId]/route.ts` - GET endpoint для получения данных конфигуратора
  - [ ] 6.3 Реализовать fetching всех доступных цветов для модификации с изображениями
  - [ ] 6.4 Реализовать fetching всех доступных дисков для модификации с изображениями
  - [ ] 6.5 Реализовать fetching всех доступных интерьеров для модификации с изображениями
  - [ ] 6.6 Реализовать fetching всех дополнительных опций для модификации с ценами
  - [ ] 6.7 Включить полные технические характеристики (specifications JSONB)
  - [ ] 6.8 Включить информацию о базовой цене модификации
  - [ ] 6.9 Оптимизировать запрос: использовать include для eager loading связанных данных
  - [ ] 6.10 Добавить валидацию trimId параметра
  - [ ] 6.11 Добавить обработку случая когда модификация не найдена (404)
  - [ ] 6.12 Создать `lib/utils/price-calculator.ts` - утилита для расчета итоговой цены конфигурации
  - [ ] 6.13 Реализовать функцию calculateTotalPrice(basePriceCny, basePriceRub, selectedColor, selectedWheels, selectedInterior, selectedOptions) → {totalCny, totalRub}

- [ ] 7.0 Создание UI компонентов конфигуратора
  - [ ] 7.1 Создать `lib/store/configurator-store.ts` - Zustand store для состояния конфигуратора (selectedTrim, selectedColor, selectedWheels, selectedInterior, selectedOptions, totalPrice)
  - [ ] 7.2 Создать `lib/hooks/use-configurator.ts` - hook для работы со store и расчетом цены
  - [ ] 7.3 Создать `components/configurator/ConfiguratorLayout.tsx` - main layout (изображение слева 60%, параметры справа 40%, адаптивный)
  - [ ] 7.4 Создать `components/configurator/ImageGallery.tsx` - галерея с главным изображением и миниатюрами (экстерьер, салон)
  - [ ] 7.5 Реализовать логику смены главного изображения при клике на миниатюру
  - [ ] 7.6 Добавить Framer Motion анимации для смены изображений (AnimatePresence с fade, 300ms)
  - [ ] 7.7 Создать `components/configurator/TrimSelector.tsx` - селектор модификации (кнопки или tabs для Pro/Max/Ultra)
  - [ ] 7.8 Реализовать обновление цены и характеристик при смене модификации
  - [ ] 7.9 Создать `components/configurator/ColorSelector.tsx` - визуальные кружки с цветами, отображение названия и доплаты
  - [ ] 7.10 Реализовать обновление изображения экстерьера при смене цвета с анимацией
  - [ ] 7.11 Создать `components/configurator/WheelSelector.tsx` - визуальные превью дисков, отображение размера и доплаты
  - [ ] 7.12 Реализовать обновление изображения экстерьера при смене дисков с анимацией
  - [ ] 7.13 Создать `components/configurator/InteriorSelector.tsx` - визуальные превью салона, отображение материала и доплаты
  - [ ] 7.14 Реализовать обновление изображения салона при смене интерьера с анимацией
  - [ ] 7.15 Создать `components/configurator/AdditionalOptions.tsx` - список опций с чекбоксами, описанием и ценами
  - [ ] 7.16 Реализовать добавление/удаление опций и пересчет итоговой цены
  - [ ] 7.17 Создать `components/configurator/PriceDisplay.tsx` - крупное отображение итоговой цены в двух валютах с counter animation
  - [ ] 7.18 Добавить анимацию изменения цены (animated counter с Framer Motion)
  - [ ] 7.19 Создать `components/configurator/SpecificationsAccordion.tsx` - аккордеон с полными техническими характеристиками
  - [ ] 7.20 Разделить характеристики по категориям (Двигатель, Трансмиссия, Подвеска, Размеры, Безопасность)
  - [ ] 7.21 Создать `app/catalog/[brand]/[model]/page.tsx` - страница конфигуратора
  - [ ] 7.22 Интегрировать все компоненты конфигуратора на странице
  - [ ] 7.23 Добавить breadcrumbs навигацию (Каталог → Марка → Модель)
  - [ ] 7.24 Реализовать responsive layout (двухколоночный на desktop, одноколоночный на mobile)
  - [ ] 7.25 Добавить SEO мета-теги для страницы конфигуратора (dynamic title, description с моделью)

- [ ] 8.0 Реализация системы управления изображениями
  - [ ] 8.1 Создать директорию `/public/uploads/cars/` с поддиректориями по структуре
  - [ ] 8.2 Создать `lib/utils/image-upload.ts` - утилиты для обработки загрузки изображений
  - [ ] 8.3 Реализовать функцию uploadImage(file: File, brand_id, model_id, trim_id, type) → {url, path}
  - [ ] 8.4 Реализовать валидацию загружаемых файлов (mime type: image/jpeg, image/png, image/webp; max size: 5MB)
  - [ ] 8.5 Реализовать конвертацию изображений в WebP формат с помощью sharp библиотеки
  - [ ] 8.6 Генерировать несколько размеров изображения: thumbnail (300x200), medium (800x600), large (1920x1080)
  - [ ] 8.7 Создать `app/api/upload/route.ts` - POST endpoint для загрузки изображений
  - [ ] 8.8 Добавить проверку прав доступа к загрузке (только для админов - для будущей CRM)
  - [ ] 8.9 Реализовать безопасное сохранение файлов с уникальными именами (UUID)
  - [ ] 8.10 Создать `components/shared/ImageOptimized.tsx` - wrapper над next/image с blur placeholder
  - [ ] 8.11 Настроить Next.js Image Optimization в next.config.js (domains, formats: webp, jpeg)
  - [ ] 8.12 Реализовать lazy loading для всех изображений в каталоге и конфигураторе
  - [ ] 8.13 Добавить fallback изображения при ошибке загрузки

- [ ] 9.0 Реализация системы заявок и уведомлений
  - [ ] 9.1 Создать `lib/validations/inquiry.ts` - Zod схемы для валидации формы заявки (name: min 2, phone: international format, email: valid email)
  - [ ] 9.2 Создать `components/configurator/InquiryForm.tsx` - форма с React Hook Form + Zod resolver
  - [ ] 9.3 Реализовать поля формы: имя (Input), телефон (Input с маской), email (Input)
  - [ ] 9.4 Добавить валидацию в реальном времени и отображение ошибок под полями
  - [ ] 9.5 Реализовать маску для телефона с поддержкой международных форматов (react-input-mask или react-phone-number-input)
  - [ ] 9.6 Создать `app/api/inquiries/route.ts` - POST endpoint для создания заявки
  - [ ] 9.7 Реализовать серверную валидацию данных формы через Zod
  - [ ] 9.8 Собрать configuration_snapshot JSONB со всеми данными конфигурации (brand, model, trim, color с изображением, wheels, interior, options, total prices)
  - [ ] 9.9 Сохранить заявку в БД со статусом "new"
  - [ ] 9.10 Создать `lib/services/email.ts` - сервис для отправки email через Nodemailer или Resend
  - [ ] 9.11 Настроить SMTP или API ключи в .env для email сервиса
  - [ ] 9.12 Создать HTML шаблон email для клиента с данными заявки и конфигурацией
  - [ ] 9.13 Создать HTML шаблон email для менеджеров с полной информацией и ссылкой на CRM
  - [ ] 9.14 Реализовать отправку email клиенту после успешного создания заявки
  - [ ] 9.15 Реализовать отправку уведомления менеджерам (несколько получателей из .env)
  - [ ] 9.16 Добавить error handling для случаев сбоя отправки email (логировать ошибку, но не блокировать создание заявки)
  - [ ] 9.17 Создать Dialog компонент для отображения успешной отправки заявки
  - [ ] 9.18 Добавить кнопку "Оставить заявку" в конфигураторе, открывающую модальное окно с формой
  - [ ] 9.19 Реализовать оптимистичный UI: показывать loading состояние при отправке
  - [ ] 9.20 Добавить rate limiting для API endpoint заявок (3 заявки в час с одного IP) - использовать upstash/ratelimit или аналог

- [ ] 10.0 Интеграция курсов валют
  - [ ] 10.1 Создать `lib/services/currency-api.ts` - сервис для работы с API ЦБ РФ
  - [ ] 10.2 Реализовать функцию fetchCurrencyRate() для получения курса CNY к RUB с https://www.cbr.ru/scripts/XML_daily.asp
  - [ ] 10.3 Парсить XML ответ и извлекать курс юаня (CharCode: CNY)
  - [ ] 10.4 Создать `app/api/currency/route.ts` - GET endpoint для получения актуального курса
  - [ ] 10.5 Реализовать POST endpoint для ручного обновления курса (для будущей админки)
  - [ ] 10.6 При сохранении курса в БД добавлять метаданные (source: 'api' или 'manual', is_manual_override)
  - [ ] 10.7 Создать cron job или API route для ежедневного автоматического обновления курса (использовать Vercel Cron Jobs или node-cron)
  - [ ] 10.8 Реализовать fallback: если API недоступен, использовать последний сохраненный курс
  - [ ] 10.9 Логировать ошибки при обновлении курса в консоль или внешний сервис (Sentry)
  - [ ] 10.10 Создать `lib/hooks/use-currency.ts` - hook для получения актуального курса на клиенте
  - [ ] 10.11 Кэшировать курс на клиенте с TTL 1 час (React Query)
  - [ ] 10.12 Обновить PriceFormatter компонент для использования актуального курса при конвертации
  - [ ] 10.13 Добавить индикатор даты последнего обновления курса ("Курс от: 03.02.2026")

- [ ] 11.0 Оптимизация производительности и SEO
  - [ ] 11.1 Настроить Image Optimization в next.config.js (quality: 85, formats: ['image/webp', 'image/jpeg'])
  - [ ] 11.2 Реализовать prefetch для критических изображений (первый экран каталога)
  - [ ] 11.3 Добавить blur placeholders для всех изображений (использовать plaiceholder или встроенный blur)
  - [ ] 11.4 Оптимизировать bundle size: проверить через `npm run build` и анализировать через @next/bundle-analyzer
  - [ ] 11.5 Настроить code splitting для тяжелых библиотек (dynamic import для Framer Motion где возможно)
  - [ ] 11.6 Добавить мемоизацию компонентов каталога (React.memo для CarCard, CatalogGrid)
  - [ ] 11.7 Оптимизировать re-renders в конфигураторе (useCallback, useMemo для expensive calculations)
  - [ ] 11.8 Настроить React Query devtools для мониторинга кэширования
  - [ ] 11.9 Добавить Suspense boundaries для асинхронных компонентов
  - [ ] 11.10 Создать файл `app/sitemap.ts` для генерации sitemap.xml
  - [ ] 11.11 Создать файл `app/robots.txt` с правилами для поисковых роботов
  - [ ] 11.12 Добавить JSON-LD structured data для автомобилей (schema.org/Car)
  - [ ] 11.13 Настроить Open Graph и Twitter Card meta tags для шаринга
  - [ ] 11.14 Добавить canonical URLs для всех страниц
  - [ ] 11.15 Оптимизировать meta descriptions (уникальные для каждой модели)
  - [ ] 11.16 Добавить alt текст для всех изображений (генерировать на основе названия модели и цвета)
  - [ ] 11.17 Провести Lighthouse audit и устранить выявленные проблемы (target: Performance > 90, SEO > 95)

- [ ] 12.0 Тестирование и документация
  - [ ] 12.1 Установить Jest и React Testing Library: `npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom`
  - [ ] 12.2 Настроить Jest config (`jest.config.js`) для Next.js и TypeScript
  - [ ] 12.3 Создать `__tests__/utils/price-calculator.test.ts` - unit тесты для калькулятора цен
  - [ ] 12.4 Создать `__tests__/utils/currency.test.ts` - unit тесты для утилит валют
  - [ ] 12.5 Создать `__tests__/components/CarCard.test.tsx` - component тесты для карточки автомобиля
  - [ ] 12.6 Создать `__tests__/components/InquiryForm.test.tsx` - тесты формы заявки с валидацией
  - [ ] 12.7 Создать `__tests__/api/catalog.test.ts` - интеграционные тесты API каталога (моки Prisma)
  - [ ] 12.8 Создать `__tests__/api/inquiries.test.ts` - интеграционные тесты API заявок
  - [ ] 12.9 Добавить тесты для фильтрации каталога (все типы фильтров)
  - [ ] 12.10 Добавить тесты для конфигуратора store (Zustand)
  - [ ] 12.11 Настроить test coverage reporting и установить минимальный порог (70%)
  - [ ] 12.12 Создать `README.md` с описанием проекта, инструкциями по установке и запуску
  - [ ] 12.13 Документировать структуру базы данных (ER диаграмма или описание таблиц)
  - [ ] 12.14 Создать API документацию (endpoints, параметры, примеры ответов) - можно использовать Swagger/OpenAPI
  - [ ] 12.15 Документировать переменные окружения в .env.example с комментариями
  - [ ] 12.16 Создать руководство по добавлению нового автомобиля (для будущей CRM)
  - [ ] 12.17 Провести E2E тестирование основных user flows (просмотр каталога → конфигурация → заявка)
  - [ ] 12.18 Провести кросс-браузерное тестирование (Chrome, Firefox, Safari, Edge)
  - [ ] 12.19 Провести тестирование на мобильных устройствах (iOS Safari, Chrome Android)
  - [ ] 12.20 Создать чек-лист для QA перед деплоем
