const productSizesQuery = `
  {
    productSizes {
      data {
        attributes {
          locale
          Title
          products(filters: { publishedAt: { ne: null } }) {
            data {
              attributes {
                variant {
                  data {
                    attributes {
                      Title
                    }
                  }
                }
              }
            }
          }
          localizations {
            data {
              attributes {
                locale
                Title
                products(filters: { publishedAt: { ne: null } }) {
                  data {
                    attributes {
                      variant {
                        data {
                          attributes {
                            Title
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default productSizesQuery;
