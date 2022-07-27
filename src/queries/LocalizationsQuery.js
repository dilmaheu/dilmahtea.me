const LocalizationsQuery = `
  {
    localizations {
      data {
        attributes {
          Code
          English
          Dutch
          German
        }
      }
    }
  }
`;

export default LocalizationsQuery;
