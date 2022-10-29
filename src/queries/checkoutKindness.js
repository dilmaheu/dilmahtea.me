const checkoutKindnessQuery = `
  {
    checkoutKindness {
      data {
        id
        attributes {
          locale
          checkout_step_order
          Title
          Intro_text
          Kindness_Causes {
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
                
                checkout_step_order
                Title
                Intro_text
                Kindness_Causes {
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

export default checkoutKindnessQuery;
