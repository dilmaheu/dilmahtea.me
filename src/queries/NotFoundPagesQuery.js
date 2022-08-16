const NotFoundPagesQuery = `
  {
    basicPages(locale: "en", filters: { Meta: { URL_slug: { eq: "404" } } }) {
      data {
        id        
        attributes {
          locale
          Title
          Intro_text
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

    recurringElement {
      data {
        id
        attributes {
          Footer_text
          Company_name
          Company_address
          Company_email
          OpenGraph_default {
            data {
              attributes {
                name
                url
                provider_metadata
                alternativeText
              }
            }
          }
          localizations {
            data {
              attributes {
                locale
                Footer_text
                Company_name
                Company_address
                Company_email
              }
            }
          }
        }
      }
    }
  }
`;

export default NotFoundPagesQuery;
