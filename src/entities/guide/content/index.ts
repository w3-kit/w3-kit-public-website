import introduction from "./introduction.md?raw";
import installation from "./installation.md?raw";
import projectStructure from "./project-structure.md?raw";
import configuration from "./configuration.md?raw";
import components from "./components.md?raw";
import theming from "./theming.md?raw";
import designTokens from "./design-tokens.md?raw";
import accessibility from "./accessibility.md?raw";
import uiLibrary from "./ui-library.md?raw";
import registry from "./registry.md?raw";
import cli from "./cli.md?raw";
import contracts from "./contracts.md?raw";
import componentsApi from "./components-api.md?raw";
import hooksUtilities from "./hooks-utilities.md?raw";
import cliCommands from "./cli-commands.md?raw";

/** Maps doc slug to raw markdown content. */
export const docContentMap: Record<string, string> = {
  introduction,
  installation,
  "project-structure": projectStructure,
  configuration,
  components,
  theming,
  "design-tokens": designTokens,
  accessibility,
  "ui-library": uiLibrary,
  registry,
  cli,
  contracts,
  "components-api": componentsApi,
  "hooks-utilities": hooksUtilities,
  "cli-commands": cliCommands,
};
