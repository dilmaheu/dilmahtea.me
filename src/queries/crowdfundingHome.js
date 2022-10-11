const crowdfundingHomeQuery = `
  {
    crowdfundingHome {
      data {
        id
        attributes {
          locale
          Meta {
            HTML_Title
            Meta_description
            noindex
            nofollow
            URL_slug
            Canonical_link
          }
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
          Heading_goal
          Heading_supporters
          Heading_plans
          Heading_block
          Block_text
          Block_blob {
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
          localizations {
            data {
              attributes {
                locale
                Meta {
                  HTML_Title
                  Meta_description
                  noindex
                  nofollow
                  URL_slug
                  Canonical_link
                }
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
                Heading_goal
                Heading_supporters
                Heading_plans
                Heading_block
                Block_text
                Block_blob {
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
          }
        }
      }
    }
  }
`;

export default crowdfundingHomeQuery;
