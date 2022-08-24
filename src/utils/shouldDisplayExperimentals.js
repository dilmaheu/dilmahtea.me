export default function shouldDisplayExperimentals() {
  return !import.meta.env.PROD && process.env.CF_PAGES_BRANCH !== "main";
}
