const basicPagesQuery = `
  {
    basicPages {
      data {
        id
        attributes {
          locale
          updatedAt
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
          localizations(filters: { publishedAt: { ne: null } }) {
            data {
              attributes {
                locale
                updatedAt
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
  }
`;

export default basicPagesQuery;
