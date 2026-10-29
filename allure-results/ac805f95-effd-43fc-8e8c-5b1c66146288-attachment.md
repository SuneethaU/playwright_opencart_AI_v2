# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\fakestore-api.spec.ts >> FakeStore API Tests >> POST - Create user @master @regression @api @users
- Location: tests\api\fakestore-api.spec.ts:320:7

# Error details

```
Error: Created user email should match the submitted email.

expect(received).toBe(expected) // Object.is equality

Expected: "Lewis29@yahoo.com"
Received: undefined
```

# Test source

```ts
  228 |     expect(created.price, 'Created product price should match the submitted price.').toBe(payload.price);
  229 |     expect(created.category, 'Created product category should match the submitted category.')
  230 |       .toBe(payload.category);
  231 |     expect(created.image, 'Created product image should match the submitted image.').toBe(payload.image);
  232 | 
  233 |     const deleteResponse = await request.delete(
  234 |       `${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(created.id))}`,
  235 |     );
  236 |     expect(deleteResponse.status(), 'Created product cleanup should return HTTP 200.').toBe(200);
  237 |   });
  238 | 
  239 |   test('PUT - Update product @master @regression @api @products', async ({ request }) => {
  240 |     const payload = RandomDataUtil.generateUpdatedProductPayload();
  241 |     const route = Routes.UPDATE_PRODUCT.replace('{id}', String(PRODUCT_ID));
  242 |     const response = await request.put(`${BASE_URL}${route}`, { data: payload });
  243 | 
  244 |     expect(response.status(), 'Updating a product should return HTTP 200.').toBe(200);
  245 |     const updated: Product = await response.json();
  246 |     expect(updated.id, 'Updated product ID should match the requested ID.').toBe(PRODUCT_ID);
  247 |     expect(updated.title, 'Updated product title should match the submitted title.').toBe(payload.title);
  248 |     expect(updated.price, 'Updated product price should match the submitted price.').toBe(payload.price);
  249 |     expect(updated.category, 'Updated product category should match the submitted category.')
  250 |       .toBe(payload.category);
  251 |     expect(updated.image, 'Updated product image should match the submitted image.').toBe(payload.image);
  252 |   });
  253 | 
  254 |   test('DELETE - Product by ID @master @regression @api @products', async ({ request }) => {
  255 |     const route = Routes.DELETE_PRODUCT.replace('{id}', String(PRODUCT_ID));
  256 |     const response = await request.delete(`${BASE_URL}${route}`);
  257 | 
  258 |     expect(response.status(), 'Deleting a product should return HTTP 200.').toBe(200);
  259 |     const deleted: { id?: number } = await response.json();
  260 |     expect(deleted.id, 'Delete response should identify the deleted product.').toBe(PRODUCT_ID);
  261 |   });
  262 | 
  263 |   // ---------------------------------------------------------
  264 |   // Users - GET
  265 |   // ---------------------------------------------------------
  266 | 
  267 |   test('GET - All users @master @sanity @api @users', async ({ request }) => {
  268 |     const response = await request.get(`${BASE_URL}${Routes.GET_ALL_USERS}`);
  269 | 
  270 |     expect(response.status(), 'Getting all users should return HTTP 200.').toBe(200);
  271 |     const users: User[] = await response.json();
  272 |     expect(Array.isArray(users), 'Users response should be an array.').toBeTruthy();
  273 |     expect(users.length, 'At least one user should be returned.').toBeGreaterThan(0);
  274 |   });
  275 | 
  276 |   test('GET - User by ID @master @sanity @api @users', async ({ request }) => {
  277 |     const route = Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID));
  278 |     const response = await request.get(`${BASE_URL}${route}`);
  279 | 
  280 |     expect(response.status(), 'Getting a user by ID should return HTTP 200.').toBe(200);
  281 |     const user: User = await response.json();
  282 |     expect(user.id, 'Returned user ID should match the requested ID.').toBe(USER_ID);
  283 |     assertUserFields(user);
  284 |   });
  285 | 
  286 |   test('GET - Users with limit @master @sanity @api @users', async ({ request }) => {
  287 |     const route = Routes.GET_USERS_WITH_LIMIT.replace('{limit}', String(LIMIT));
  288 |     const response = await request.get(`${BASE_URL}${route}`);
  289 | 
  290 |     expect(response.status(), 'Getting users with a limit should return HTTP 200.').toBe(200);
  291 |     const users: User[] = await response.json();
  292 |     expect(Array.isArray(users), 'Limited users response should be an array.').toBeTruthy();
  293 |     expect(users.length, 'User count should match the requested limit.').toBe(LIMIT);
  294 |   });
  295 | 
  296 |   test('GET - Users sorted ascending @master @sanity @api @users', async ({ request }) => {
  297 |     const route = Routes.GET_USERS_SORTED.replace('{order}', 'asc');
  298 |     const response = await request.get(`${BASE_URL}${route}`);
  299 | 
  300 |     expect(response.status(), 'Ascending user sort should return HTTP 200.').toBe(200);
  301 |     const users: User[] = await response.json();
  302 |     expect(Array.isArray(users), 'Sorted users response should be an array.').toBeTruthy();
  303 |     expectIdsSorted(users.map((user) => user.id), 'asc', 'User');
  304 |   });
  305 | 
  306 |   test('GET - Users sorted descending @master @sanity @api @users', async ({ request }) => {
  307 |     const route = Routes.GET_USERS_SORTED.replace('{order}', 'desc');
  308 |     const response = await request.get(`${BASE_URL}${route}`);
  309 | 
  310 |     expect(response.status(), 'Descending user sort should return HTTP 200.').toBe(200);
  311 |     const users: User[] = await response.json();
  312 |     expect(Array.isArray(users), 'Sorted users response should be an array.').toBeTruthy();
  313 |     expectIdsSorted(users.map((user) => user.id), 'desc', 'User');
  314 |   });
  315 | 
  316 |   // ---------------------------------------------------------
  317 |   // Users - POST / PUT / DELETE
  318 |   // ---------------------------------------------------------
  319 | 
  320 |   test('POST - Create user @master @regression @api @users', async ({ request }) => {
  321 |     const payload = RandomDataUtil.generateUserPayload();
  322 |     const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: payload });
  323 | 
  324 |     expect(createResponse.status(), 'Creating a user should return HTTP 201.').toBe(201);
  325 |     const created: User = await createResponse.json();
  326 |     expect(Number.isInteger(created.id), 'Created user should include an integer ID.').toBeTruthy();
  327 |     expect(created.id, 'Created user ID should be positive.').toBeGreaterThan(0);
> 328 |     expect(created.email, 'Created user email should match the submitted email.').toBe(payload.email);
      |                                                                                   ^ Error: Created user email should match the submitted email.
  329 |     expect(created.username, 'Created user username should match the submitted username.')
  330 |       .toBe(payload.username);
  331 |     expect(created.name.firstname, 'Created user first name should match the submitted value.')
  332 |       .toBe(payload.name.firstname);
  333 |     expect(created.name.lastname, 'Created user last name should match the submitted value.')
  334 |       .toBe(payload.name.lastname);
  335 | 
  336 |     const deleteResponse = await request.delete(
  337 |       `${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(created.id))}`,
  338 |     );
  339 |     expect(deleteResponse.status(), 'Created user cleanup should return HTTP 200.').toBe(200);
  340 |   });
  341 | 
  342 |   test('PUT - Update user @master @regression @api @users', async ({ request }) => {
  343 |     const payload = RandomDataUtil.generateUserUpdatePayload();
  344 |     const route = Routes.UPDATE_USER.replace('{id}', String(USER_ID));
  345 |     const response = await request.put(`${BASE_URL}${route}`, { data: payload });
  346 | 
  347 |     expect(response.status(), 'Updating a user should return HTTP 200.').toBe(200);
  348 |     const updated: User = await response.json();
  349 |     expect(updated.email, 'Updated user email should match the submitted email.').toBe(payload.email);
  350 |     expect(updated.username, 'Updated user username should match the submitted username.')
  351 |       .toBe(payload.username);
  352 |     expect(updated.name.firstname, 'Updated first name should match the submitted value.')
  353 |       .toBe(payload.name.firstname);
  354 |     expect(updated.name.lastname, 'Updated last name should match the submitted value.')
  355 |       .toBe(payload.name.lastname);
  356 |   });
  357 | 
  358 |   test('DELETE - User by ID @master @regression @api @users', async ({ request }) => {
  359 |     const route = Routes.DELETE_USER.replace('{id}', String(USER_ID));
  360 |     const response = await request.delete(`${BASE_URL}${route}`);
  361 | 
  362 |     expect(response.status(), 'Deleting a user should return HTTP 200.').toBe(200);
  363 |     const deleted: { id?: number } = await response.json();
  364 |     expect(deleted.id, 'Delete response should identify the deleted user.').toBe(USER_ID);
  365 |   });
  366 | 
  367 |   // ---------------------------------------------------------
  368 |   // Carts - GET
  369 |   // ---------------------------------------------------------
  370 | 
  371 |   test('GET - All carts @master @sanity @api @carts', async ({ request }) => {
  372 |     const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CARTS}`);
  373 | 
  374 |     expect(response.status(), 'Getting all carts should return HTTP 200.').toBe(200);
  375 |     const carts: Cart[] = await response.json();
  376 |     expect(Array.isArray(carts), 'Carts response should be an array.').toBeTruthy();
  377 |     expect(carts.length, 'At least one cart should be returned.').toBeGreaterThan(0);
  378 |   });
  379 | 
  380 |   test('GET - Cart by ID @master @sanity @api @carts', async ({ request }) => {
  381 |     const route = Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID));
  382 |     const response = await request.get(`${BASE_URL}${route}`);
  383 | 
  384 |     expect(response.status(), 'Getting a cart by ID should return HTTP 200.').toBe(200);
  385 |     const cart: Cart = await response.json();
  386 |     expect(cart.id, 'Returned cart ID should match the requested ID.').toBe(CART_ID);
  387 |     assertCartFields(cart);
  388 |   });
  389 | 
  390 |   test('GET - Carts by date range @master @sanity @api @carts', async ({ request }) => {
  391 |     if (!START_DATE || !END_DATE || Number.isNaN(Date.parse(START_DATE)) || Number.isNaN(Date.parse(END_DATE))) {
  392 |       throw new Error('START_DATE and END_DATE must be valid dates configured in .env.');
  393 |     }
  394 |     expect(Date.parse(START_DATE), 'Start date must not be after end date.')
  395 |       .toBeLessThanOrEqual(Date.parse(END_DATE));
  396 | 
  397 |     const route = Routes.GET_CARTS_BY_DATE_RANGE
  398 |       .replace('{startdate}', encodeURIComponent(START_DATE))
  399 |       .replace('{enddate}', encodeURIComponent(END_DATE));
  400 |     const response = await request.get(`${BASE_URL}${route}`);
  401 | 
  402 |     expect(response.status(), 'Filtering carts by date range should return HTTP 200.').toBe(200);
  403 |     const carts: Cart[] = await response.json();
  404 |     expect(Array.isArray(carts), 'Date-filtered carts response should be an array.').toBeTruthy();
  405 |     const firstDate = START_DATE.slice(0, 10);
  406 |     const lastDate = END_DATE.slice(0, 10);
  407 |     for (const cart of carts) {
  408 |       const cartDate = new Date(cart.date);
  409 |       expect(Number.isNaN(cartDate.getTime()), 'Each cart should contain a valid date.').toBeFalsy();
  410 |       const cartDateOnly = cartDate.toISOString().slice(0, 10);
  411 |       expect(
  412 |         cartDateOnly >= firstDate,
  413 |         'Each cart date should be on or after the requested start date.',
  414 |       ).toBeTruthy();
  415 |       expect(
  416 |         cartDateOnly <= lastDate,
  417 |         'Each cart date should be on or before the requested end date.',
  418 |       ).toBeTruthy();
  419 |     }
  420 |   });
  421 | 
  422 |   test('GET - Carts for a user @master @sanity @api @carts', async ({ request }) => {
  423 |     const route = Routes.GET_USER_CART.replace('{userId}', String(USER_ID));
  424 |     const response = await request.get(`${BASE_URL}${route}`);
  425 | 
  426 |     expect(response.status(), 'Getting a user cart should return HTTP 200.').toBe(200);
  427 |     const carts: Cart[] = await response.json();
  428 |     expect(Array.isArray(carts), 'User carts response should be an array.').toBeTruthy();
```