const userAccountOrderQuery = `
  {
    userAccountOrder {
      data {
        attributes {
          locale
          Title
          Breadcrumb{
            Steps{
              Name
              Link
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
                Breadcrumb{
                  Steps{
                    Name
                    Link
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

export default userAccountOrderQuery;