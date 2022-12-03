const cartQuery = `
  {
    cart {
      data {
        id
        attributes {
          locale
          updatedAt
          text_cart
          text_product
          text_remove
          text_go_to_checkout
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
                text_cart
                text_product
                text_remove
                text_go_to_checkout
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

export default cartQuery;
