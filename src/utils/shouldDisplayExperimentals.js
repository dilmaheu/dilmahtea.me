const shouldDisplayExperimentals =
  !import.meta.env.PROD || process.env.GITHUB_REF_NAME !== "main";

export default shouldDisplayExperimentals;
