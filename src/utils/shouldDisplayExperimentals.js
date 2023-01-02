const shouldDisplayExperimentals =
  !import.meta.env.PROD || process.env.CF_PAGES_BRANCH !== "main";

export default shouldDisplayExperimentals;
