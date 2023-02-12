const userAccountOrderQuery = `
  {
    userAccountOrder {
      data {
        attributes {
          locale
          Breadcrumb{
            Steps{
              Name
              Link
            }
          }
          Button_change_text
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
                Breadcrumb{
                  Steps{
                    Name
                    Link
                  }
                }
                Button_change_text
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