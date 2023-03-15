const countriesQuery = `
  {
    countries {
      data {
        attributes {
          locale
          name
          localizations {
            data {
              attributes {
                locale
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default countriesQuery;
