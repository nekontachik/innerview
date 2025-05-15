**STARTFILE next-fix-climb.md**
<Climb>
  <header>
    <id>next1</id>
    <type>bug</type>
    <description>Fix Next.js bundle loading issue causing 404 error and form data loss</description>
  </header>

  <problem>
    - Error: GET http://localhost:3000/_next/static/chunks/main-app.js?v=1747291253414 net::ERR_ABORTED 404 (Not Found)
    - Form data is being cleared after error
    - This indicates a problem with Next.js build/bundle process
  </problem>

  <relevantFiles>
    - next.config.js
    - package.json
    - src/app/layout.tsx
    - src/app/create/page.tsx
  </relevantFiles>

  <moves>
    1. Clear Next.js cache and rebuild
    2. Verify Next.js configuration
    3. Check build process
    4. Test form persistence
  </moves>
</Climb>
**ENDFILE** 