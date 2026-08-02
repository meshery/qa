import { defineConfig } from "allure";

const PROJECTS = {
  KANVAS: "Kanvas",
  MESHERY: "Meshery",
  LAYER5_REMOTE_PROVIDER: "Layer5Cloud",
  MESHERYCTL: "mesheryctl",
  // EXTENSION POINT (see https://docs.meshery.io/extensibility)
  // OPEN AN ISSUE TO ADD TEST RESULTS FROM YOUR EXTENSION HERE.
  // EXTENSION POINT
};

const isProject = (labels, projectName) =>
  labels.find(({ name, value }) => name === "project" && value === projectName);

// Behavior-scoped report keys. A Connections result is tagged at its source
// (UI Playwright specs and CLI converters) with epic="Kubernetes Connections",
// componentUnderTest (Test Plan col C), testId=TC-<n> (Test Plan col A), and
// client (UI|CLI). See https://qa.meshery.io and the meshery test-tagging docs.
const CONNECTIONS_EPIC = "Kubernetes Connections";

// componentUnderTest values that denote Kubernetes connection behavior. Used as
// a fallback selector when a result predates the epic label.
const CONNECTION_COMPONENTS = /kubernetes/i;

// Select a result into the Connections report: prefer the explicit epic label.
// The componentUnderTest fallback applies ONLY to results that carry no epic
// label at all (tagged before the epic convention) - a result with a different
// epic value must not be pulled in just because its component is Kubernetes.
const isConnectionBehavior = (labels) => {
  const hasEpic = labels.some(({ name }) => name === "epic");
  if (hasEpic) {
    return labels.some(
      ({ name, value }) => name === "epic" && value === CONNECTIONS_EPIC,
    );
  }
  return labels.some(
    ({ name, value }) =>
      name === "componentUnderTest" && CONNECTION_COMPONENTS.test(value),
  );
};

export default defineConfig({
  name: "Meshery Quality Dashboard",
  output: "./allure-report",
  historyPath: "./history.jsonl",
  plugins: {
    dashboard: {
      options: {
        singleFile: true,
        reportName: "Dashboard",
        reportLanguage: "en",
        logo: "https://raw.githubusercontent.com/meshery-extensions/qa/refs/heads/master/.github/assets/images/meshery/icon-only/meshery-light-icon.svg",
      },
    },
    // awesome: {
    //   options: {
    //     singleFile: false,
    //     reportName: "Dashboard",
    //     reportLanguage: "en",
    //     logo: "https://raw.githubusercontent.com/meshery-extensions/qa/refs/heads/master/.github/assets/images/meshery/icon-only/meshery-light-icon.svg",
    //     reportName: "Aggregate Dashboard",
    //     charts: 
    //       [{
    //         "type": "pie",
    //         "title": "Test Type Distribution",
    //         "data": {
    //           "API Tests": 80,
    //           "UI Tests": 20
    //         },
    //       }
    //     ],
    //     publish: true,
    //   },
    // },
    meshery: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "Meshery",
        singleFile: false,
        reportLanguage: "en",
        open: false,
        logo: "https://raw.githubusercontent.com/meshery-extensions/qa/refs/heads/master/.github/assets/images/meshery/icon-only/meshery-light-icon.svg",
        filter: ({ labels }) => isProject(labels, PROJECTS.MESHERY),
      },
    },
    mesheryctl: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "Mesheryctl",
        singleFile: false,
        reportLanguage: "en",
        open: false,
        logo: "https://raw.githubusercontent.com/meshery-extensions/qa/refs/heads/master/.github/assets/images/meshery/icon-only/meshery-light-icon.svg",
        filter: ({ labels }) => isProject(labels, PROJECTS.MESHERYCTL),
      },
    },
    // EXTENSION POINT (see https://docs.meshery.io/extensibility)
    // OPEN AN ISSUE TO ADD TEST RESULTS FROM YOUR EXTENSION HERE.
    // EXTENSION POINT
    layer5Cloud: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "Extension: Remote Provider Layer5 Cloud",
        singleFile: false,
        reportLanguage: "en",
        open: false,
        logo: "https://raw.githubusercontent.com/meshery-extensions/qa/refs/heads/master/.github/assets/images/layer5/svg/light/5-light-no-trim.svg",
        filter: ({ labels }) =>
          isProject(labels, PROJECTS.LAYER5_REMOTE_PROVIDER),
      },
    },
    kanvas: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "Extension: Kanvas",
        singleFile: false,
        reportLanguage: "en",
        open: false,
        logo: "https://raw.githubusercontent.com/meshery-extensions/qa/refs/heads/master/.github/assets/images/kanvas/kanvas-icon-color-trim.svg",
        filter: ({ labels }) => isProject(labels, PROJECTS.KANVAS),
        // Suite-based hierarchy
        groupBy: ["parentSuite", "suite", "subSuite"],
      },
    },
    // Cross-client behavior report: aggregates Kubernetes Connection tests from
    // BOTH the UI (project=Meshery) and CLI (project=mesheryctl) pools. It keys
    // on the epic label, NOT project, so it is an additional lens - connection
    // tests still appear in the Meshery and Mesheryctl reports above.
    connections: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "Kubernetes Connections",
        singleFile: false,
        reportLanguage: "en",
        open: false,
        logo: "https://raw.githubusercontent.com/meshery-extensions/qa/refs/heads/master/.github/assets/images/meshery/icon-only/meshery-light-icon.svg",
        filter: ({ labels }) => isConnectionBehavior(labels),
        // Group by client (UI vs CLI) first, then the suite hierarchy. The
        // awesome plugin (preciseTreeLabels) keeps only label names present on
        // at least one result, so results missing "client" fall back to the
        // suite/subSuite grouping automatically.
        groupBy: ["client", "suite", "subSuite"],
      },
    },

    log: {
      options: {
        groupBy: "none",
      },
    },
    csv: {
      options: {
        fileName: "report.csv",
      },
    },
  },
});
