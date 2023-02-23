const productVariantsQuery = `
  {
    productVariants {
      data {
        attributes {
          locale
          Name
          products(filters: { publishedAt: { ne: null } }) {
            data {
              attributes {
                size {
                  data {
                    attributes {
                      Size
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
                Name
                products(filters: { publishedAt: { ne: null } }) {
                  data {
                    attributes {
                      size {
                        data {
                          attributes {
                            Size
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

export default productVariantsQuery;
