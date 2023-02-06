const homeEstateQuery = `
  {
    homeEstate {
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
                formats
                alternativeText
              }
            }
          }
          Heading_block
          Block_text
          Block2_aria_label_text
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
          Block3_aria_label_text
          Block3
          Block4_heading
          Block4_items_aria_label_text
          Block4_items {
            Block4_Value
            Block4_description
            Block4_icon{
              data {
                attributes {
                  url
                  provider_metadata
                  alternativeText
                }
              }
            }
          }
          blogs {
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
                Meta {
                  URL_slug
                }
              }
            }
          }
          Aria_label_all_estates_text
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
                      formats
                      alternativeText
                    }
                  }
                }
                Heading_block
                Block_text
                Block2_aria_label_text
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
                Block3_aria_label_text
                Block3
                Block4_heading
                Block4_items_aria_label_text
                Block4_items {
                  Block4_Value
                  Block4_description
                  Block4_icon{
                    data {
                      attributes {
                        url
                        provider_metadata
                        alternativeText
                      }
                    }
                  }
                }
                blogs {
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
                      Meta {
                        URL_slug
                      }
                    }
                  }
                }
                Aria_label_all_estates_text
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

export default homeEstateQuery;
