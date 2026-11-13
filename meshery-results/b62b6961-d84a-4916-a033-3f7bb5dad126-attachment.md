# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: controllers-config.spec.ts >> Operator, MeshSync & Broker Settings >> Reach the server-wide controllers editor from the header menu
- Location: tests/e2e/controllers-config.spec.ts:143:7

# Error details

```
Error: apiRequestContext.put: connect ECONNREFUSED ::1:9081
Call log:
  - → PUT http://localhost:9081/api/system/controllers/config
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.7827.55 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: application/json
    - content-length: 2
    - cookie: meshery-provider=Local

```

```
Error: apiRequestContext.put: connect ECONNREFUSED ::1:9081
Call log:
  - → PUT http://localhost:9081/api/system/controllers/config
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.7827.55 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: application/json
    - content-length: 2
    - cookie: meshery-provider=Local

```