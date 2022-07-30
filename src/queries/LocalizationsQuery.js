const LocalizationsQuery = `
  {
    localizations {
      data {
        attributes {
          Code
          English
          Dutch
          Deutsch
        }
      }
    }
  }
`;

export default LocalizationsQuery;
