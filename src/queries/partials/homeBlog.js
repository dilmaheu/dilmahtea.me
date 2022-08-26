const homeBlogQuery = `
  {
    homeBlog {
      data {
        id
        attributes {
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
              }
            }
          }
          locale
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

export default homeBlogQuery;
