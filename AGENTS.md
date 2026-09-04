## Общие правила

- Отвечай на русском.
- Если возникают спорные моменты при реализации или не хватает информации, лучше уточни у пользователя, что и как сделать.
- Ориентируйся на стиль и архитектурные решения проекта `/Users/dmitriy.shvachich/projects/luckycell`: React + TypeScript, слоистая структура, MobX stores, StyleX, Inversify DI, axios/orval для API.
- В текущем проекте `geocart` используется Next App Router. Не мигрируй роутинг/runtime на Vite или TanStack Router только потому, что так сделано в `luckycell`; такая миграция должна быть отдельной явной задачей.
- Не добавляй новые библиотеки для состояния, стилей, DI, роутинга или HTTP, если существующий стек решает задачу.

## Архитектура и слои

- Придерживаемся Clean Architecture в практичном виде, как в `luckycell`: presentation/app-shell отделен от domain, data, network и di.
- `src/app` в `geocart` держи тонким слоем Next: routes, layouts, server entrypoints, API routes, `redirect`, нормализация route/search params и передача готовых данных в presentation. Не размещай здесь бизнес-логику и сложный UI.
- `src/app-shell` - presentation слой: страницы, компоненты, MobX stores, shared UI styles. Компоненты и stores работают с domain entity/type, а не с DTO/OpenAPI models.
- `src/domain` - domain entity/type, enums и общие domain types. Этот слой не должен импортировать `app`, `app-shell`, `data`, `network`, React, Next или axios.
- `src/data` - repositories, mappers, OpenAPI-generated code, fallback/mock data и сборка данных для страниц. Здесь происходит работа с DTO и преобразование во внутренние domain модели.
- `src/network` - настройка HTTP-клиентов и transport-specific логика.
- `src/di` - Inversify container и React provider для зависимостей, которые должны жить дольше конкретного компонента.
- Если сценарий становится переиспользуемым и уже не помещается естественно в repository/page-data/store, выноси его в отдельный use case в domain/application-слой, не смешивая с UI.

## Domain, DTO и маппинг

- Маппинг из DTO в entity/type выполняй в `data/mappers` внутри repository или data-функции до передачи данных выше. В MobX store, use case и presentation должны приходить уже domain entity/type.
- Маппинг из domain entity/type или примитивов в DTO также выполняй в data/repository слое.
- Если маппишь DTO в domain entity/type, файл размещай в `src/data/mappers`. Если маппишь одну domain entity/type в другую domain entity/type, используй `src/domain/mappers`.
- Для TypeScript используем существующий формат mapper object: `ProductListItemToProductMapperExtension.toEntity(...)`, `SearchResponseDtoToSearchResultEntityMapperExtension.toEntity(...)`, `SomeEntityToSomeDtoMapperExtension.toDto(...)`.
- Название mapper object: `<Source>To<Target>MapperExtension`. Методы короткие: `toEntity`, `toDto`.
- Domain entity/type создавай на основе структуры DTO, но UI-specific поля добавляй только если они действительно стали частью domain модели. Логику, вычисления и инварианты держи в domain entity/class/helper, а не в компонентах.
- Не меняй существующие domain `type` на классы только ради единообразия. Класс уместен, когда нужны методы, инварианты или управляемое состояние.

## Repositories и API

- Repositories являются границей между внешним API/OpenAPI DTO и domain моделью. Они вызывают `src/data/openapi`, `src/network` или axios-клиент, обрабатывают fallback/timeout и возвращают domain entity/type.
- Не импортируй OpenAPI models в `app-shell` и MobX stores. Исключение - очень локальная типизация внутри data/API route, если данные не уходят в presentation.
- Generated файлы в `src/data/openapi` не редактируй вручную. После изменения `openapi.yaml` запускай генерацию через существующий npm script.
- Константы timeout, лимитов, fallback id и default params держи рядом с repository/data-функцией, которая ими владеет.
- Клиентский MobX store может обращаться к внутреннему Next API route для интерактивных сценариев, но внешний API и DTO-преобразования должны оставаться в data/network слое.

## MobX stores

- Store оформляй классом с `makeAutoObservable(this, {}, { autoBind: true })`, если нет причины отключить autoBind или исключить внешние зависимости из observable.
- Store отвечает за состояние экрана/виджета, computed getters и UI actions. Не помещай в store DTO-маппинг и transport-specific детали.
- После `await` изменяй observable состояние через `runInAction` или `flow`, если это требуется MobX-паттерном конкретного store.
- Для page-level или feature-level stores создавай React context рядом со store/page и передавай store через provider, как в `luckycell`.
- Компонент оборачивай в `observer` только если он читает observable состояние.
- Используй guard clauses: `if (...) { return }` / `if (!store) { return null }`, избегай лишних вложенных `if/else`.

## UI и компоненты

- Пиши функциональные React-компоненты с явными `Props` type.
- Держи page-компоненты композиционными: они собирают layout из компонентов и получают готовые domain данные/stores.
- Переиспользуемые элементы размещай в `src/app-shell/components`, page-specific части - рядом со страницей в `src/app-shell/pages/<feature>/components`.
- Для Next client components ставь `'use client'` только там, где нужны hooks, browser API, MobX observer/actions или интерактивность.
- Не протаскивай DTO, axios responses или repository-specific типы в props компонентов.
- Assets подключай по существующему паттерну проекта: `public/assets/...`, `src/app-shell/components/assets.ts`, `next/image` там, где он уже используется и подходит.
- Обработка всех кликов и других действий должна происходить в Store Mobx
- Компоненты давай выносить в отдельные файлы, чтобы не было такого, что в рамках одно файла есть несколько компонентов
- Стили для компонентов давай также выносить в файлы, относящиеся к компонентам


## StyleX и дизайн

- Стили компонентов пиши через StyleX: `import * as stylex from '@stylexjs/stylex'`, `const styles = stylex.create(...)`, применение через `stylex.props(...)`.
- Используй design tokens/CSS variables из `src/app-shell/design-system/tokens.css` и общие стили из `src/app-shell/styles/shared.styles.ts`; не размазывай магические цвета и layout-значения по компонентам без причины.
- Новые повторяющиеся размеры, цвета, тени и layout-константы сначала добавляй в tokens/shared styles, если они не являются строго локальной деталью одного компонента.
- Inline styles и обычный `className` используй только там, где StyleX технически не подходит или уже есть явный локальный паттерн.
- Верстку делай responsive сразу: проверяй desktop и mobile состояния, фиксируй размеры интерактивных элементов, не допускай наложения текста и UI.

## Кодстайл

- Используй строгий TypeScript, `type`/`interface` для публичных контрактов и `import type` для type-only импортов.
- Импорты из `src` делай через alias `@/...`.
- Для строковых типов используй `string`, не `String`.
- Не оставляй `console.log`, TODO без задачи, мертвый код и закомментированные блоки.
- Не делай широкие refactor changes вместе с узкой фичей или фиксом.
- При изменении файлов учитывай существующие незакоммиченные изменения пользователя и не откатывай их без явного запроса.

## Проверки

- Для обычных изменений запускай `npm run lint` и `npm run typecheck`, если задача затрагивает TypeScript/React код.
- Для изменений, влияющих на сборку, routing/runtime или generated API, дополнительно запускай `npm run build`.
- После изменения `openapi.yaml` запускай `npm run generate:openapi` и затем проверяй diff generated файлов.
