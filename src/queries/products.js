const productsQuery = `
  {
    products {
      data {
        id
        attributes {
          locale
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
          Block_text
          Price
          Currency
          SKU
          Barcode
          Weight
          Weight_unit
          Weight_tea
          Weight_tea_unit
          createdAt
          recipes {
            data{
              attributes{
                Title
                Intro_blob{
                  data{
                    attributes{
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                authors{
                  data{
                    attributes{
                      givenName
                    }
                  }
                }
                createdAt
                Meta{
                  URL_slug
                }
              }
            }
          }
          blogs {
            data{
              attributes{
                Title
                Intro_blob{
                  data{
                    attributes{
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                authors{
                  data{
                    attributes{
                      givenName
                    }
                  }
                }
                createdAt
                Meta{
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
          localizations {
            data {
              attributes {
                locale
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
                Block_text
                Price
                Currency
                SKU
                Barcode
                Weight
                Weight_unit
                Weight_tea
                Weight_tea_unit
                createdAt
                recipes {
                  data{
                    attributes{
                      Title
                      Intro_blob{
                        data{
                          attributes{
                            url
                            provider_metadata
                            alternativeText
                          }
                        }
                      }
                      authors{
                        data{
                          attributes{
                            givenName
                          }
                        }
                      }
                      createdAt
                      Meta{
                        URL_slug
                      }
                    }
                  }
                }
                blogs {
                  data{
                    attributes{
                      Title
                      Intro_blob{
                        data{
                          attributes{
                            url
                            provider_metadata
                            alternativeText
                          }
                        }
                      }
                      authors{
                        data{
                          attributes{
                            givenName
                          }
                        }
                      }
                      createdAt
                      Meta{
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
              }
            }
          }
        }
      }
    }
  }
`;

export default productsQuery;
