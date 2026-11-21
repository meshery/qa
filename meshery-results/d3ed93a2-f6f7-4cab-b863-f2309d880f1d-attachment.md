# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: controllers-config.spec.ts >> Operator, MeshSync & Broker Settings >> Resolve each field through override, then server-wide default, then built-in
- Location: tests/e2e/controllers-config.spec.ts:519:7

# Error details

```
Error: expect(received).toBeUndefined()

Received: {"broker": {"replicas": 7}, "schemaVersion": "controllers.meshery.io/v1alpha1"}
```

# Test source

```ts
  454 |           'MeshSync version, replicas, watch scope and pod environment settings reach only connections running in Operator mode.',
  455 |         ),
  456 |       ).toHaveCount(0);
  457 |       await expect(
  458 |         page.getByText('Meshery Broker settings reach only connections running in Operator mode.'),
  459 |       ).toHaveCount(0);
  460 | 
  461 |       expect(await saveDefaults(page)).toEqual({
  462 |         schemaVersion: SCHEMA_VERSION,
  463 |         operator: { deploymentMode: 'operator' },
  464 |       });
  465 |     },
  466 |   );
  467 | 
  468 |   // Covers all seventeen wire paths of SETTING_ROWS at the storage boundary: a
  469 |   // document carrying every setting must survive the write/read round-trip byte
  470 |   // for byte, with no field silently dropped and no default silently injected.
  471 |   test(
  472 |     'Round-trip every documented wire path through the server-wide defaults',
  473 |     { tag: caseTags('API/System Controllers Config') },
  474 |     async ({ request }, testInfo) => {
  475 |       annotateCase(testInfo, {
  476 |         feature: 'Layered document storage',
  477 |         story: 'Every setting survives write and read unchanged',
  478 |         wirePaths: SETTING_ROWS.map((row) => row.path),
  479 |       });
  480 | 
  481 |       const full = {
  482 |         operator: { deploymentMode: 'operator', version: 'v0.7.9' },
  483 |         meshsync: {
  484 |           version: 'v0.8.6',
  485 |           replicas: 2,
  486 |           watchList: { blacklist: ['secrets.v1.', 'events.v1.'] },
  487 |           outputNamespaces: ['kube-system', 'default'],
  488 |           outputResources: ['pod', 'deployment'],
  489 |           redactSecrets: true,
  490 |           brokerContentDedup: true,
  491 |           debugLogging: true,
  492 |         },
  493 |         broker: {
  494 |           version: '2.10.24',
  495 |           replicas: 3,
  496 |           service: {
  497 |             type: 'LoadBalancer',
  498 |             annotations: { 'service.beta.kubernetes.io/aws-load-balancer-internal': 'true' },
  499 |             loadBalancerClass: 'service.k8s.aws/nlb',
  500 |             loadBalancerSourceRanges: ['10.0.0.0/8', '192.168.0.0/16'],
  501 |             externalEndpointOverride: 'broker.example.com:4222',
  502 |           },
  503 |         },
  504 |       };
  505 | 
  506 |       const expected = { schemaVersion: SCHEMA_VERSION, ...full };
  507 |       expect(await putServerDefaults(request, full)).toEqual(expected);
  508 |       expect(await getServerDefaults(request)).toEqual(expected);
  509 |     },
  510 |   );
  511 | 
  512 |   // Covers: operator.deploymentMode, meshsync.replicas, broker.replicas,
  513 |   //         broker.service.type
  514 |   //
  515 |   // Precedence: per-connection override (layer 1) over server-wide default
  516 |   // (layer 2) over built-in (layer 3), field by field. Every field layers
  517 |   // independently, so a field left unset at layer 1 still resolves through
  518 |   // layer 2 while a sibling is overridden.
  519 |   test(
  520 |     'Resolve each field through override, then server-wide default, then built-in',
  521 |     { tag: caseTags('API/Connection Controllers Config') },
  522 |     async ({ request }, testInfo) => {
  523 |       annotateCase(testInfo, {
  524 |         feature: 'Layered precedence',
  525 |         story: 'Override beats server-wide default beats built-in',
  526 |         wirePaths: [
  527 |           'operator.deploymentMode',
  528 |           'meshsync.replicas',
  529 |           'broker.replicas',
  530 |           'broker.service.type',
  531 |         ],
  532 |       });
  533 | 
  534 |       const connections = await kubernetesConnections(request);
  535 |       if (connections.length === 0) {
  536 |         test.skip(true, 'No Kubernetes connection registered to carry a per-connection override.');
  537 |         return;
  538 |       }
  539 |       const connectionId = connections[0].id;
  540 | 
  541 |       try {
  542 |         // Layer 3 only: nothing set anywhere.
  543 |         //
  544 |         // deploymentMode is deliberately excluded here. Unlike every other
  545 |         // setting, it has a layer BENEATH the document that the client cannot
  546 |         // see - the server's MESHSYNC_DEFAULT_DEPLOYMENT_MODE - so the resolved
  547 |         // value with nothing set is the server's env default, not the compiled
  548 |         // built-in. Asserting the built-in made this test pass in CI (where the
  549 |         // variable is unset) and fail for anyone running the repo's own
  550 |         // `make server`, which sets it to `operator` by default. The mode's
  551 |         // full precedence, including that env layer, is covered by
  552 |         // TestB3ServerWideDeploymentModeReachesInheritingConnection.
  553 |         const builtIn = await getConnectionConfig(request, connectionId);
> 554 |         expect(builtIn.override).toBeUndefined();
      |                                  ^ Error: expect(received).toBeUndefined()
  555 |         expect(builtIn.effective).toMatchObject({
  556 |           meshsync: { replicas: BUILT_IN.meshsyncReplicas },
  557 |           broker: {
  558 |             replicas: BUILT_IN.brokerReplicas,
  559 |             service: { type: BUILT_IN.brokerServiceType },
  560 |           },
  561 |         });
  562 |         expect(['operator', 'embedded']).toContain(builtIn.effective.operator?.deploymentMode);
  563 | 
  564 |         // Layer 2: the server-wide default reaches a connection that overrides
  565 |         // nothing.
  566 |         await putServerDefaults(request, {
  567 |           meshsync: { replicas: 5 },
  568 |           broker: { replicas: 3, service: { type: 'NodePort' } },
  569 |         });
  570 |         const defaulted = await getConnectionConfig(request, connectionId);
  571 |         expect(defaulted.override).toBeUndefined();
  572 |         expect(defaulted.default).toMatchObject({
  573 |           meshsync: { replicas: 5 },
  574 |           broker: { replicas: 3, service: { type: 'NodePort' } },
  575 |         });
  576 |         expect(defaulted.effective).toMatchObject({
  577 |           meshsync: { replicas: 5 },
  578 |           broker: { replicas: 3, service: { type: 'NodePort' } },
  579 |         });
  580 |         // deploymentMode is excluded for the same reason as above: with neither
  581 |         // editable layer setting it, the resolved value is the server's
  582 |         // MESHSYNC_DEFAULT_DEPLOYMENT_MODE, which the client cannot observe.
  583 |         expect(['operator', 'embedded']).toContain(defaulted.effective.operator?.deploymentMode);
  584 | 
  585 |         // Layer 1: the override wins for the fields it sets, and only those.
  586 |         const overridden = await putConnectionConfig(request, connectionId, {
  587 |           broker: { replicas: 7 },
  588 |         });
  589 |         expect(overridden.override).toEqual({
  590 |           schemaVersion: SCHEMA_VERSION,
  591 |           broker: { replicas: 7 },
  592 |         });
  593 |         expect(overridden.effective).toMatchObject({
  594 |           broker: {
  595 |             replicas: 7,
  596 |             // Not overridden - still the server-wide default.
  597 |             service: { type: 'NodePort' },
  598 |           },
  599 |           // Not overridden - still the server-wide default.
  600 |           meshsync: { replicas: 5 },
  601 |         });
  602 |       } finally {
  603 |         await putConnectionConfig(request, connectionId, {});
  604 |       }
  605 |     },
  606 |   );
  607 | 
  608 |   // Covers: meshsync.outputNamespaces, meshsync.outputResources
  609 |   //
  610 |   // The inherit round-trip at layer 1: clearing a per-connection override must
  611 |   // remove the field from the stored override document, so the server-wide
  612 |   // default applies to that connection again. Collections merge whole, so the
  613 |   // override replaces the default's list rather than being unioned with it.
  614 |   test(
  615 |     'Clear a per-connection override and the server-wide default applies again',
  616 |     { tag: caseTags('API/Connection Controllers Config') },
  617 |     async ({ request }, testInfo) => {
  618 |       annotateCase(testInfo, {
  619 |         feature: 'Layered precedence',
  620 |         story: 'Clearing an override restores the server-wide default',
  621 |         wirePaths: ['meshsync.outputNamespaces', 'meshsync.outputResources'],
  622 |       });
  623 | 
  624 |       const connections = await kubernetesConnections(request);
  625 |       if (connections.length === 0) {
  626 |         test.skip(true, 'No Kubernetes connection registered to carry a per-connection override.');
  627 |         return;
  628 |       }
  629 |       const connectionId = connections[0].id;
  630 | 
  631 |       try {
  632 |         await putServerDefaults(request, {
  633 |           meshsync: {
  634 |             outputNamespaces: ['kube-system', 'default'],
  635 |             outputResources: ['pod', 'deployment'],
  636 |           },
  637 |         });
  638 | 
  639 |         // The override replaces the whole collection - not element-wise, which
  640 |         // would produce a scope neither layer asked for.
  641 |         const overridden = await putConnectionConfig(request, connectionId, {
  642 |           meshsync: { outputNamespaces: ['meshery'] },
  643 |         });
  644 |         expect(overridden.effective).toMatchObject({
  645 |           meshsync: {
  646 |             outputNamespaces: ['meshery'],
  647 |             outputResources: ['pod', 'deployment'],
  648 |           },
  649 |         });
  650 | 
  651 |         // Back to Inherit: the field leaves the override document entirely, and
  652 |         // with nothing left in it the layer itself stops being reported - an
  653 |         // empty override and no override are the same state.
  654 |         const cleared = await putConnectionConfig(request, connectionId, {});
```