const countriesQuery = `
  {
    countries {
      data {
        attributes {
          locale
          name
          localizations(filters: { publishedAt: { ne: null } }) {
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
