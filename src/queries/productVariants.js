const productVariantsQuery = `
  {
    productVariants {
      data {
        attributes {
          locale
          Name
          localizations {
            data {
              attributes {
                locale
                Name
              }
            }
          }
        }
      }
    }
  }
`;

export default productVariantsQuery;
