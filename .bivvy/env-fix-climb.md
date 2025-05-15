**STARTFILE env-fix-climb.md**
<Climb>
  <header>
    <id>env1</id>
    <type>bug</type>
    <description>Виправити помилку з відсутніми змінними середовища Supabase в продакшені</description>
  </header>
  <newDependencies>
    - Немає нових залежностей
  </newDependencies>
  <prerequisitChanges>
    - Перевірити всі змінні середовища в коді
    - Перевірити конфігурацію в render.yaml
  </prerequisitChanges>
  <relevantFiles>
    - src/app/api/test-db/route.ts
    - src/lib/supabase.ts
    - render.yaml
  </relevantFiles>
  <bugDescription>
    Помилка при білді: "Missing Supabase environment variables"
    Проблема в тому, що код очікує NEXT_PUBLIC_ змінні, але в продакшені використовуються звичайні.
  </bugDescription>
  <technicalRequirements>
    - Перевірити всі місця використання змінних середовища
    - Забезпечити сумісність з обома форматами (з NEXT_PUBLIC_ і без)
    - Оновити документацію
  </technicalRequirements>
  <successMetrics>
    - Успішний білд в продакшені
    - Коректна робота API ендпоінтів
  </successMetrics>
</Climb>
**ENDFILE** 