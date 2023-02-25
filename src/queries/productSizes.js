const productSizesQuery = `
  {
    productSizes{
      data {
        id
        attributes {
          locale
          updatedAt
          Size
          localizations {
            data {
              attributes {
                locale
                updatedAt
                Size
              }
            }
          }
        }
      }
    }
  }
`;

export default productSizesQuery;
