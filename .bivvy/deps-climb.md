**STARTFILE deps-climb.md**
<Climb>
  <header>
    <id>deps1</id>
    <type>task</type>
    <description>Update dependencies to fix security vulnerabilities and ensure compatibility</description>
  </header>

  <newDependencies>
    - next@14.2.28 (from 14.1.0)
    - @testing-library/react@latest (from 16.3.0)
    - @testing-library/jest-dom@latest (from 6.6.3)
    - eslint-config-next@14.2.28 (from 14.1.0)
  </newDependencies>

  <prerequisitChanges>
    - Backup package.json and package-lock.json
    - Test all functionality after updates
  </prerequisitChanges>

  <relevantFiles>
    - package.json
    - package-lock.json
    - src/__tests__/*.test.tsx
    - next.config.js
  </relevantFiles>

  <everythingElse>
    ## Проблема
    - Критична вразливість в Next.js 14.1.0
    - Застарілі версії тестових бібліотек
    - Потрібно оновити eslint-config-next

    ## План оновлення
    1. Оновити Next.js до 14.2.28
    2. Оновити тестові бібліотеки
    3. Оновити eslint-config-next
    4. Перевірити сумісність всіх залежностей
    5. Протестувати функціональність

    ## Критерії успіху
    - Всі вразливості виправлені
    - Всі тести проходять
    - Додаток працює коректно
    - Немає помилок типізації
  </everythingElse>
</Climb>
**ENDFILE** 