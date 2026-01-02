import { defineConfig } from "allure";

const PROJECTS = {
  KANVAS: "Kanvas",
  MESHERY: "Meshery",
  LAYER5_REMOTE_PROVIDER: "Layer5 Remote Provider",
  // EXTENSION POINT (see https://docs.meshery.io/extensibility)
  // OPEN AN ISSUE TO ADD TEST RESULTS FROM YOUR EXTENSION HERE.
  // EXTENSION POINT
};

const isProject = (labels, projectName) =>
  labels.find(({ name, value }) => name === "project" && value === projectName);

export default defineConfig({
  name: "Meshery Quality Dashboard",
  output: "./allure-report",
  historyPath: "./history.jsonl",
  plugins: {
    dashboard: {
      options: {
        singleFile: false,
        reportName: "Dashboard",
        reportLanguage: "en",
      },
    },
    allMeshery: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "All Meshery Tests",
        singleFile: false,
        reportLanguage: "en",
        open: false,
        filter: ({ labels }) => isProject(labels, PROJECTS.MESHERY),
      },
    },
    // EXTENSION POINT (see https://docs.meshery.io/extensibility)
    // OPEN AN ISSUE TO ADD TEST RESULTS FROM YOUR EXTENSION HERE.
    // EXTENSION POINT
    allRemoteProvider: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "All Layer5 Remote Provider Tests",
        singleFile: false,
        reportLanguage: "en",
        open: false,
        filter: ({ labels }) =>
          isProject(labels, PROJECTS.LAYER5_REMOTE_PROVIDER),
      },
    },
    allKanvas: {
      import: "@allurereport/plugin-awesome",
      options: {
        reportName: "All Kanvas Tests",
        singleFile: false,
        reportLanguage: "en",
        open: false,
        filter: ({ labels }) => isProject(labels, PROJECTS.KANVAS),
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
