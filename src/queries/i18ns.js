const i18nsQuery = `
  {
    i18Ns {
      data {
        attributes {
          code
          locale
          language
          localizations {
            data {
              attributes {
                code
                locale
                language
              }
            }
          }
        }
      }
    }
  }
`;

export default i18nsQuery;
