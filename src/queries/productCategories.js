const productCategoriesQuery = `
  {
    productCategories {
      data {
        id
        attributes {
          locale
          updatedAt
          Title
          Intro_text
          Intro_blob {
            data {
              id
              attributes {
                url
                provider_metadata
                formats
                alternativeText
              }
            }
          }
          Heading_button_text
          Heading_button_link
          Block_text
          Sub_categories {
            data {
              attributes {
                Title
                Intro_text
              }
            }
          }
          Relevant_items_title
          Relevant_recipes(filters: { publishedAt: { ne: null } }) {
            data {
              attributes {
                Title
                Intro_text
                Intro_blob {
                  data {
                    attributes {
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                Meta {
                  URL_slug
                }
              }
            }
          }
          Meta {
            HTML_Title
            Meta_description
            noindex
            nofollow
            URL_slug
            Canonical_link
          }
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
                updatedAt
                Title
                Intro_text
                Intro_blob {
                  data {
                    id
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                Heading_button_text
                Heading_button_link
                Block_text
                Sub_categories {
                  data {
                    attributes {
                      Title
                      Intro_text
                    }
                  }
                }
                Relevant_items_title
                Relevant_recipes(filters: { publishedAt: { ne: null } }) {
                  data {
                    attributes {
                      Title
                      Intro_text
                      Intro_blob {
                        data {
                          attributes {
                            url
                            provider_metadata
                            alternativeText
                          }
                        }
                      }
                      Meta {
                        URL_slug
                      }
                    }
                  }
                }
                Meta {
                  HTML_Title
                  Meta_description
                  noindex
                  nofollow
                  URL_slug
                  Canonical_link
                }
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

export default productCategoriesQuery;
