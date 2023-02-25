const productVariantsQuery = `
  {
    productVariants{
      data {
        id
        attributes {
          locale
          updatedAt
          Name
          localizations {
            data {
              attributes {
                locale
                updatedAt
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
