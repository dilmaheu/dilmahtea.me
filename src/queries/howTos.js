const howTosQuery = `
  {
    howTos {
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
          Method {
            Method_title
            Steps {
              Step_title
              Step_text
              Step_blob {
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
            }
          }
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
                Method {
                  Method_title
                  Steps {
                    Step_title
                    Step_text
                    Step_blob {
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
                  }
                }
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

export default howTosQuery;
