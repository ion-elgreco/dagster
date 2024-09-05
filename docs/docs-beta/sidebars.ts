import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // docSidebar: [{ type: "autogenerated", dirName: "." }],
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'tutorial/quick-start', 'tutorial/installation'],
    },
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial/tutorial-etl'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'category',
          label: 'Data modeling',
          link: {
            type: 'doc',
            id: 'guides/data-modeling',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'guides/data-modeling',
            },
            {
              type: 'doc',
              label: 'Structuring your project',
              id: 'guides/project-structure',
            },
          ],
        },
        {
          type: 'category',
          label: 'Ingestion and Transformation',
          link: {
            type: 'doc',
            id: 'guides/ingestion-transformation',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'guides/ingestion-transformation',
            },
          ],
        },
        {
          type: 'category',
          label: 'Automation and Scheduling',
          link: {
            type: 'doc',
            id: 'guides/automation',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'guides/automation',
            },
          ],
        },
        {
          type: 'category',
          label: 'Integrating with External Systems',
          link: {
            type: 'doc',
            id: 'guides/external-systems',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'guides/external-systems',
            },
          ],
        },
        {
          type: 'category',
          label: 'Data Quality and Testing',
          link: {
            type: 'doc',
            id: 'guides/quality-testing',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'guides/quality-testing',
            },
          ],
        },
        {
          type: 'category',
          label: 'Monitoring and Alerting',
          link: {
            type: 'doc',
            id: 'guides/monitor-alert',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'guides/monitor-alert',
            },
          ],
        },
        {
          type: 'category',
          label: 'Deployment',
          link: {
            type: 'doc',
            id: 'guides/deployment',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'guides/deployment',
            },
          ],
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          link: {
            type: 'doc',
            id: 'guides/troubleshooting',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'guides/troubleshooting',
            },
          ],
        },
        {
          type: 'category',
          label: 'TBD',
          items: [
            {
              type: 'autogenerated',
              dirName: 'guides/tbd',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        {
          type: 'category',
          label: 'Assets',
          link: {
            type: 'doc',
            id: 'concepts/assets',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'concepts/assets',
            },
          ],
        },
        {
          type: 'category',
          label: 'Automation and Scheduling',
          link: {
            type: 'doc',
            id: 'concepts/automation',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'concepts/automation',
            },
          ],
        },
        {
          type: 'doc',
          label: 'Partitions',
          id: 'concepts/partitions',
        },
        {
          type: 'doc',
          label: 'Resources',
          id: 'concepts/resources',
        },
        {
          type: 'doc',
          label: 'I/O managers',
          id: 'concepts/io-managers',
        },
        {
          type: 'category',
          label: 'Ops and jobs',
          link: {
            type: 'doc',
            id: 'concepts/ops-jobs',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'concepts/ops-jobs',
            },
          ],
        },
        {
          type: 'category',
          label: 'Execution',
          link: {
            type: 'doc',
            id: 'concepts/execution',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'concepts/execution',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'About',
      items: [
        {
          type: 'autogenerated',
          dirName: 'about',
        },
      ],
    },
  ],
  dagsterPlus: [
    {
      type: 'category',
      label: 'Getting started',
      collapsible: false,
      className: 'category-non-collapsible',
      items: [
        {
          type: 'doc',
          id: 'dagster-plus/whats-dagster-plus',
        },
        {
          type: 'doc',
          id: 'dagster-plus/getting-started',
        },
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Insights',
          link: {
            type: 'doc',
            id: 'dagster-plus/insights',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'dagster-plus/insights',
            },
          ],
        },
        {
          type: 'category',
          label: 'Branch Deployments (CI)',
          link: {
            type: 'doc',
            id: 'dagster-plus/deployment/branch-deployments',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'dagster-plus/deployment/branch-deployments',
            },
          ],
        },
        {
          type: 'category',
          label: 'Alerts',
          link: {
            type: 'doc',
            id: 'dagster-plus/deployment/alerts',
          },
          items: [
            {
              type: 'doc',
              label: 'Manage alerts in the UI',
              id: 'dagster-plus/deployment/alerts/ui',
            },
            {
              type: 'doc',
              label: 'Manage alerts with the CLI',
              id: 'dagster-plus/deployment/alerts/cli',
            },
            {
              type: 'doc',
              label: 'Email',
              id: 'dagster-plus/deployment/alerts/email',
            },
            {
              type: 'doc',
              label: 'Microsoft Teams',
              id: 'dagster-plus/deployment/alerts/microsoft-teams',
            },
            {
              type: 'doc',
              label: 'PagerDuty',
              id: 'dagster-plus/deployment/alerts/pagerduty',
            },
            {
              type: 'doc',
              label: 'Slack',
              id: 'dagster-plus/deployment/alerts/slack',
            },
          ],
        },
        {
          type: 'category',
          label: 'Authentication & access control',
          items: [
            {
              type: 'category',
              label: 'Role-based Access Control',
              link: {
                type: 'doc',
                id: 'dagster-plus/access/rbac',
              },
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'dagster-plus/access/rbac',
                },
              ],
            },
            {
              type: 'category',
              label: 'Single Sign-on (SSO)',
              items: [
                'dagster-plus/access/authentication/azure-ad-sso',
                'dagster-plus/access/authentication/google-workspace-sso',
                'dagster-plus/access/authentication/okta-sso',
                'dagster-plus/access/authentication/onelogin-sso',
                'dagster-plus/access/authentication/pingone-sso',
              ],
            },
            {
              type: 'category',
              label: 'SCIM provisioning',
              items: [
                {
                  type: 'link',
                  label: 'Azure Active Directory',
                  href: 'https://learn.microsoft.com/en-us/azure/active-directory/saas-apps/dagster-cloud-provisioning-tutorial',
                },
                {
                  type: 'doc',
                  label: 'Okta',
                  id: 'dagster-plus/access/authentication/okta-scim',
                },
              ],
            },
          ],
        },
        {
          type: 'doc',
          id: 'dagster-plus/saved-views',
        },
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Serverless',
          link: {
            type: 'doc',
            id: 'dagster-plus/deployment/serverless',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'dagster-plus/deployment/serverless',
            },
          ],
        },
        {
          type: 'category',
          label: 'Hybrid',
          link: {
            type: 'doc',
            id: 'dagster-plus/deployment/hybrid',
          },
          items: [
            {
              type: 'doc',
              label: 'Tokens',
              id: 'dagster-plus/deployment/hybrid/tokens',
            },
            {
              type: 'category',
              label: 'Agents',
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'dagster-plus/deployment/hybrid/agents',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'CI/CD',
          items: [
            {
              type: 'autogenerated',
              dirName: 'dagster-plus/deployment/branch-deployments',
            },
          ],
        },
        {
          type: 'category',
          label: 'Code locations',
          link: {
            type: 'doc',
            id: 'dagster-plus/deployment/code-locations',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'dagster-plus/deployment/code-locations',
            },
          ],
        },
        {
          type: 'category',
          label: 'Environment variables',
          link: {
            type: 'doc',
            id: 'dagster-plus/deployment/environment-variables',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'dagster-plus/deployment/environment-variables',
            },
          ],
        },
        {
          type: 'doc',
          label: 'Settings',
          id: 'dagster-plus/settings',
        },
      ],
    },
  ],
  api: [
    {
      type: 'category',
      label: 'Dagster API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api',
        },
      ],
    },
  ],
};

export default sidebars;
