**STARTFILE api-fix-climb.md**
<Climb>
  <header>
    <id>api1</id>
    <type>bug</type>
    <description>Fix 404 error in API routes</description>
  </header>
  <newDependencies>None</newDependencies>
  <prerequisitChanges>None</prerequisitChanges>
  <relevantFiles>
    - src/app/api/test-db/route.ts
    - next.config.js
    - src/lib/supabase.ts
  </relevantFiles>
  <everythingElse>
    Problem:
    - API routes return 404 Not Found
    - Test DB endpoint not accessible
    - Possible issues with Next.js App Router configuration

    Investigation needed:
    - Verify API route structure
    - Check Next.js configuration
    - Test basic API endpoint
    - Verify environment variables
    - Test Supabase connection
  </everythingElse>
</Climb>
**ENDFILE** 