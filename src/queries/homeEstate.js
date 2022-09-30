const homeEstateQuery = `
  {
    homeEstate {
      data {
        attributes {
          localizations {
            data {
              attributes {
                locale
                Title
                Intro_text
                Heading_button_text
                Heading_button_link
                Intro_blob {
                  data {
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                Heading_block
                Block_text
                Block2_text
                Block2_blob {
                  data {
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                Block3
                Block4_heading
                Block4_items{
                  Block4_Value
                  Block4_description
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
          locale
          Title
          Intro_text
          Heading_button_text
          Heading_button_link
          Intro_blob {
            data {
              attributes {
                url
                provider_metadata
                formats
                alternativeText
              }
            }
          }
          Heading_block
          Block_text
          Block2_text
          Block2_blob {
            data {
              attributes {
                url
                provider_metadata
                formats
                alternativeText
              }
            }
          }
          Block3
          Block4_heading
          Block4_items{
            Block4_Value
            Block4_description
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
`;

export default homeEstateQuery;
