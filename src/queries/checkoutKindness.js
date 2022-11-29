const checkoutKindnessQuery = `
  {
    checkoutKindness {
      data {
        id
        attributes {
          locale
          updatedAt
          checkout_step_order
          Title
          Intro_text
          Kindness_Causes {
            cause
            description
            featured_blob {
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
                updatedAt                
                checkout_step_order
                Title
                Intro_text
                Kindness_Causes {
                  cause
                  description
                  featured_blob {
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
