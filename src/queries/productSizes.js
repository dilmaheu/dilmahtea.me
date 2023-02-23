const productSizesQuery = `
  {
    productSizes {
      data {
        attributes {
          locale
          Size
          products(filters: { publishedAt: { ne: null } }) {
            data {
              attributes {
                variant {
                  data {
                    attributes {
                      Name
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
                Size
                products(filters: { publishedAt: { ne: null } }) {
                  data {
                    attributes {
                      variant {
                        data {
                          attributes {
                            Name
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
