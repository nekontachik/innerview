**STARTFILE metrics-climb.md**
<Climb>
  <header>
    <id>metrics</id>
    <type>feature</type>
    <description>Додати систему метрик для моніторингу продуктивності</description>
  </header>
  <newDependencies>
    - @vercel/analytics
  </newDependencies>
  <prerequisitChanges>
    - Додати конфігурацію для Vercel Analytics
  </prerequisitChanges>
  <relevantFiles>
    - src/app/layout.tsx
    - src/app/page.tsx
    - src/app/result/[id]/page.tsx
  </relevantFiles>
  <featureOverview>
    Додати метрики для:
    1. Кількості створених портретів
    2. Кількості переглядів портретів
    3. Кількості реакцій
    4. Час відповіді API
    5. Помилки та їх типи
  </featureOverview>
  <technicalRequirements>
    - Інтеграція з Vercel Analytics
    - Анонімні метрики (без PII)
    - Real-time дашборд
  </technicalRequirements>
  <successMetrics>
    - Відстеження росту користувачів
    - Моніторинг продуктивності
    - Виявлення проблемних місць
  </successMetrics>
</Climb>
**ENDFILE** 