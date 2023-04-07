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
          Block_text
          Sub_categories {
            data {
              attributes {
                Title
                Intro_text
                products(filters: { publishedAt: { ne: null } }) {
                  data {
                    id
                  }
                }
              }
            }
          }
          Breadcrumb{
            Steps{
              Name
              Link
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
              id
            }
          }
          localizations(filters: { publishedAt: { ne: null } }) {
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
                Block_text
                Sub_categories {
                  data {
                    attributes {
                      Title
                      Intro_text
                      products(filters: { publishedAt: { ne: null } }) {
                        data {
                          id
                        }
                      }
                    }
                  }
                }
                Breadcrumb{
                  Steps{
                    Name
                    Link
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
                    id
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
