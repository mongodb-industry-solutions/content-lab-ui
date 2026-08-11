/**
 * URL registry for the E2E suite, one entry per app and environment, mirroring `config/apps.json` in
 * the central ist-endtoend-tests-demo-solutions repo (the nested `environments` shape here matches the
 * convention already used by that repo's own frontend-local suites, e.g. leafy-wallet). There is no
 * `prod` environment on purpose - the central repo does not run one for this app either.
 */
export const APPS = {
  'content-lab': {
    displayName: 'Content Lab',
    vertical: 'telco',
    testIdPrefix: 'TLC-CL',
    environments: {
      // Matches PORT in Dockerfile.frontend / docker-compose.yml, so `npm run dev` and the
      // production `npm run start` both listen on the same port as the container does.
      local: { frontend: 'http://localhost:8080' },
      // Corp network only (via the `web-app` Helm chart), unreachable from outside the staging VPC.
      staging: { frontend: 'http://contentlab-ui-web-app:80' },
    },
  },
};
