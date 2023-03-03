const productVariantsQuery = `
  {
    productVariants {
      data {
        attributes {
          locale
          Title
          products(filters: { publishedAt: { ne: null } }) {
            data {
              attributes {
                size {
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
                      size {
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

export default productVariantsQuery;
