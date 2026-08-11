import { APPS } from '../config/apps.js';

export const DEFAULT_APP = 'content-lab';
export const DEFAULT_ENV = 'local';

/** Format a list for an error message, so a typo names the valid options instead of just failing. */
function listOf(values) {
  return values.length ? values.join(', ') : '(none)';
}

/**
 * Resolves app URLs from the registry in `../config/apps.js`. API-compatible with the `EnvironmentHelper`
 * in the central ist-endtoend-tests-demo-solutions repo (same static method set, minus `getBackendUrl`,
 * which that repo does not have either), so a spec written against this file runs unchanged there.
 */
export class EnvironmentHelper {
  /**
   * All configured URLs for an app/environment pair.
   * @param {string} appName
   * @param {string} [environment]
   * @returns {{frontend: string}}
   */
  static getAppUrls(appName, environment = DEFAULT_ENV) {
    const app = APPS[appName];
    if (!app) {
      throw new Error(`App '${appName}' not found in configuration. Available apps: ${listOf(Object.keys(APPS))}`);
    }

    const env = app.environments[environment];
    if (!env) {
      const availableEnvs = Object.keys(app.environments);
      throw new Error(
        `Environment '${environment}' not found for app '${appName}'. Available environments: ${listOf(availableEnvs)}`
      );
    }

    return env;
  }

  /**
   * Frontend URL for an app in an environment, with no trailing slash.
   * `BASE_URL` overrides everything, which is how you point a run at an ad-hoc port or a branch deploy.
   * @param {string} [appName]
   * @param {string} [environment]
   * @returns {string}
   */
  static getFrontendUrl(appName = DEFAULT_APP, environment = DEFAULT_ENV) {
    if (process.env.BASE_URL) {
      return process.env.BASE_URL.replace(/\/$/, '');
    }

    const urls = this.getAppUrls(appName, environment);
    if (!urls.frontend) {
      throw new Error(`Frontend URL not configured for app '${appName}' in environment '${environment}'`);
    }

    return urls.frontend.replace(/\/$/, '');
  }

  /**
   * Display name for an app, for logging/reporting.
   * @param {string} appName
   * @returns {string}
   */
  static getAppDisplayName(appName) {
    const app = APPS[appName];
    if (!app) {
      throw new Error(`App '${appName}' not found in configuration`);
    }
    return app.displayName || appName;
  }

  /**
   * Every app key in the registry.
   * @returns {string[]}
   */
  static getAvailableApps() {
    return Object.keys(APPS);
  }

  /**
   * Every environment key registered for one app.
   * @param {string} appName
   * @returns {string[]}
   */
  static getAvailableEnvironments(appName) {
    const app = APPS[appName];
    if (!app) {
      throw new Error(`App '${appName}' not found in configuration`);
    }
    return Object.keys(app.environments);
  }

  /**
   * Whether an app/environment combination exists in the registry.
   * @param {string} appName
   * @param {string} environment
   * @returns {boolean}
   */
  static isValidAppEnvironment(appName, environment) {
    try {
      this.getAppUrls(appName, environment);
      return true;
    } catch {
      return false;
    }
  }
}
