const homeProductQuery = `
  {
    homeProduct {
      data {
        id
        attributes {
          locale
          Title
          Intro_text
          Heading_button_text
          Heading_button_link
          Intro_blob{
            data{
              attributes{
                url
                provider_metadata
                alternativeText
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
                Heading_button_text
                Heading_button_link
                Intro_blob{
                  data{
                    attributes{
                      url
                      provider_metadata
                      alternativeText
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

export default homeProductQuery;
