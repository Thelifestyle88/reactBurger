## Stellar Burgers. Учебный проект

### Автор - Николаенко Николай

Ссылка на проект: https://thelifestyle88.github.io/
</br></br>

### Описание проекта

Пользователь имеет возможность создать на сайте личный кабинет (размещен на внешнем сервере), формировать заказы из загруженных с внешнего сервера ингредиентов путем перетаскивания их в конструктор (Drag & Drop), заказывать бургеры, просматривать историю своих заказов и общую ленту заказов в режиме реального времени(реализован Websocket), ознакомиться с детализацией заказов и подробной информацией об ингредиентах.

Выполнение проекта позволило отработать следующие основные навыки:

- построение архитектуры и логики работы сайта с использованием функциональных компонентов React: хуки, мемоизация компонентов, защищенные и общедоступные роуты, функционал DnD (перетаскивание и сортировка).
- получение данных из внешних источников (fetch и WebSocket c токенами и без), предварительная обработка данных (middleware), структурирование хранилища, генерация и обработка потока событий Redux;
- реализация функционала ленты и истории заказов с использованием вэб-сокета для получения данных в режиме реального времени, с обработкой и хранением информации в Redux-хранилище, и рендерингом видимых объектов по мере обновления входящих данных;
- реализация функционала личного кабинета пользователя: идентификация, аутентификация и авторизация (с использованием пароля и токенов), редактирование профиля и восстановление пароля;
- тестирование работы основных компонентов сайта: модульные тесты всех редьюсеров (Jest), формирование и оформление заказа (end-to-end тест Cypress);
- использование инструментов отладки React Dev Tools, Redux Dev Tools.

Проект реализован на языке программирования TypeScript с использованием библиотек React, Redux и отдельных компонентов (типографика, иконки, кнопка, строка ввода), предоставленных Яндекс Практикумом. Частичное покрытие сайта тестами выполнено с использованием Jest и Cypress.
</br></br>

### Развернуть проект локально:

- клонировать проект на локальный компьютер командой в терминале:

```
git clone https://github.com/Thelifestyle88/reactBurger.git
```

- в терминале перейти в папку проекта и установить пакет serve:

```
npm i serve
```

- запустить проект локально в режиме разработки:

```
npm run start
```

</br>