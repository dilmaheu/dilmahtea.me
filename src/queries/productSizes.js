const productSizesQuery = `
  {
    productSizes {
      data {
        attributes {
          locale
          Size
          localizations {
            data {
              attributes {
                locale
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
