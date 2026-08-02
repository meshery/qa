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

// Test-Group-keyed report selector. The general report key is the `testGroup`
// label, whose value is the Meshery Test Plan "Latest" tab Test Group (col B).
// Every Test Group can drive its own filtered report by keying on this label;
// "Connection Lifecycle" is the first consumer. Results are tagged at their
// source (UI Playwright specs and CLI converters) - see the meshery
// test-tagging docs and https://qa.meshery.io.
const isTestGroup = (labels, groupName) =>
  labels.some(
    ({ name, value }) => name === "testGroup" && value === groupName,
  );

const hasTestGroup = (labels) => labels.some(({ name }) => name === "testGroup");

// Single source of truth for the Connection Lifecycle Test Group value - used
// for both the report display name and the testGroup filter so the two cannot
// drift apart.
const CONNECTION_LIFECYCLE_GROUP = "Connection Lifecycle";

// --- Transitional epic-based fallback (remove once all connection results
// carry testGroup) -----------------------------------------------------------
// Before this rename the connection report keyed on epic="Kubernetes
// Connections" plus a Kubernetes componentUnderTest fallback. Kept only so the
// report is not empty for results emitted before the testGroup label existed;
// drops once fresh runs of every connection test carry testGroup.
const CONNECTIONS_EPIC = "Kubernetes Connections";

// Matches componentUnderTest values that denote Kubernetes connection behavior.
// Used as a fallback selector when a result predates the epic label.
const CONNECTION_COMPONENT_RE = /kubernetes/i;

// Select a result into the connection report via the legacy epic label: prefer
// the explicit epic label. The componentUnderTest fallback applies ONLY to
// results that carry no epic label at all (tagged before the epic convention) -
// a result with a different epic value must not be pulled in just because its
// component is Kubernetes.
const isConnectionBehavior = (labels) => {
  const hasEpic = labels.some(({ name }) => name === "epic");
  if (hasEpic) {
    return labels.some(
      ({ name, value }) => name === "epic" && value === CONNECTIONS_EPIC,
    );
  }
  return labels.some(
    ({ name, value }) =>
      name === "componentUnderTest" && CONNECTION_COMPONENT_RE.test(value),
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
    // Test-Group-keyed report: a filtered view over one shared Allure pool,
    // selected by the `testGroup` label (Test Plan col B). This "Connection
    // Lifecycle" report aggregates the connection tests from BOTH the UI
    // (project=Meshery) and CLI (project=mesheryctl) pools - it keys on
    // testGroup, NOT project, so it is an additional lens; those tests still
    // appear in the Meshery and Mesheryctl reports above. The same pattern
    // generalizes to one filtered report per Test Group: add a plugin whose
    // filter is isTestGroup(labels, "<Test Group>").
    //
    // The plugin key stays `connections` so the published report URL
    // (https://qa.meshery.io/connections/) is unchanged; only the display name
    // and filter change.
    //
    // Transitional: the isConnectionBehavior (epic) fallback keeps the report
    // populated with connection results emitted before the testGroup label
    // existed. It applies ONLY to results carrying no testGroup label at all -
    // a result that already carries a testGroup (of any value) is authoritative,
    // so a different-group result must not be pulled in via the legacy epic/
    // component heuristic. Drop the whole fallback once all connection results
    // carry testGroup.
    connections: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: CONNECTION_LIFECYCLE_GROUP,
        singleFile: false,
        reportLanguage: "en",
        open: false,
        logo: "https://raw.githubusercontent.com/meshery-extensions/qa/refs/heads/master/.github/assets/images/meshery/icon-only/meshery-light-icon.svg",
        filter: ({ labels }) =>
          isTestGroup(labels, CONNECTION_LIFECYCLE_GROUP) ||
          (!hasTestGroup(labels) && isConnectionBehavior(labels)),
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
