const homeProductQuery = `
  {
    homeProduct {
      data {
        id
        attributes {
          locale
          updatedAt
          Title
          Intro_text
          Heading_button_text
          Heading_button_link
          Intro_blob {
            data {
              attributes {
                url
                provider_metadata
                alternativeText
              }
            }
          }
          Category_title
          Block_title
          Block_text
          Block2_title
          Block2_button_text
          Block2_button_link
          Block2_blob {
            data {
              attributes {
                url
                provider_metadata
                alternativeText
              }
            }
          }
          Block3_text
          Aria_label_all_teas_text
          Aria_label_tea_item_text
          blogs (filters: { publishedAt: { ne: null } }) {
            data {
              attributes {
                Title
                Intro_blob {
                  data {
                    attributes {
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                authors {
                  data {
                    attributes {
                      givenName
                    }
                  }
                }
                createdAt
                publishedAt
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
          localizations {
            data {
              attributes {
                locale
                updatedAt
                Title
                Intro_text
                Heading_button_text
                Heading_button_link
                Intro_blob {
                  data {
                    attributes {
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                Category_title
                Block_title
                Block_text
                Block2_title
                Block2_button_text
                Block2_button_link
                Block2_blob {
                  data {
                    attributes {
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                Block3_text
                Aria_label_all_teas_text
                Aria_label_tea_item_text
                blogs (filters: { publishedAt: { ne: null } }) {
                  data {
                    attributes {
                      Title
                      Intro_blob {
                        data {
                          attributes {
                            url
                            provider_metadata
                            alternativeText
                          }
                        }
                      }
                      authors {
                        data {
                          attributes {
                            givenName
                          }
                        }
                      }
                      createdAt
                      publishedAt
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
              }
            }
          }
        }
      }
    }
  }
`;

export default homeProductQuery;
