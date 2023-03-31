const blogsQuery = `
  {
    blogs {
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
          Block_text
          createdAt
          updatedAt
          publishedAt
          authors {
            data {
              attributes {
                givenName
                Profile_picture {
                  data {
                    attributes {
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
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
                Block_text
                createdAt
                updatedAt
                publishedAt
                authors {
                  data {
                    attributes {
                      givenName
                      Profile_picture {
                        data {
                          attributes {
                            url
                            provider_metadata
                            alternativeText
                          }
                        }
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

export default blogsQuery;
