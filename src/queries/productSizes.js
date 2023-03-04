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
                locale
                createdAt
                Title
                Intro_text
                Stock_amount
                In_stock_date
                Intro_blob {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
                variant {
                  data {
                    attributes {
                      Title
                    }
                  }
                }
                size {
                  data {
                    attributes {
                      Title
                    }
                  }
                }
                Meta {
                  URL_slug
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
                      locale
                      createdAt
                      Title
                      Intro_text
                      Stock_amount
                      In_stock_date
                      Intro_blob {
                        data {
                          attributes {
                            url
                            alternativeText
                          }
                        }
                      }
                      variant {
                        data {
                          attributes {
                            Title
                          }
                        }
                      }
                      size {
                        data {
                          attributes {
                            Title
                          }
                        }
                      }
                      Meta {
                        URL_slug
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
