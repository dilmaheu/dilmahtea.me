const userAccountAddressQuery = `
  {
    userAccountAddress {
      data {
        attributes {
          locale
          Title
          Block2_title
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
                Block2_title
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

export default userAccountAddressQuery;