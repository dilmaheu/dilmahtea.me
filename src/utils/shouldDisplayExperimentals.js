console.log(process.env);

const shouldDisplayExperimentals =
  !import.meta.env.PROD || github.ref_name !== "main";

export default shouldDisplayExperimentals;
