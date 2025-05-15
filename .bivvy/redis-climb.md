**STARTFILE redis-climb.md**
<Climb>
  <header>
    <id>redis</id>
    <type>feature</type>
    <description>Додати Redis кешування для оптимізації продуктивності</description>
  </header>
  <newDependencies>
    - @upstash/redis (вже встановлено)
  </newDependencies>
  <prerequisitChanges>
    - Redis конфігурація вже налаштована в render.yaml
    - Змінні середовища UPSTASH_REDIS_URL та UPSTASH_REDIS_TOKEN вже додані
  </prerequisitChanges>
  <relevantFiles>
    - src/lib/supabase.ts
    - src/app/api/portraits/route.ts
    - src/app/api/portraits/[id]/route.ts
  </relevantFiles>
  <featureOverview>
    Додати Redis кешування для:
    1. Списку портретів (GET /api/portraits)
    2. Окремого портрету (GET /api/portraits/[id])
    3. Реакцій на портрети (PATCH /api/portraits/[id])
    
    Кеш має оновлюватися при:
    - Створенні нового портрету
    - Оновленні реакцій
    - Видаленні портрету
  </featureOverview>
  <technicalRequirements>
    - TTL для кешу: 5 хвилин
    - Кеш має автоматично інвалідуватися при змінах
    - Обробка помилок Redis
    - Fallback на Supabase при помилках Redis
  </technicalRequirements>
  <successMetrics>
    - Зменшення часу відповіді API
    - Зменшення навантаження на Supabase
    - Стабільність роботи при високих навантаженнях
  </successMetrics>
</Climb>
**ENDFILE** 