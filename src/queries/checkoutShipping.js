const checkoutShippingQuery = `
  {
    checkoutShipping {
      data {
        id
        attributes {
          locale
          checkout_step_order
          text_contact
          text_delivery_address
          text_change
          text_shipping_method
          text_continue_to_payment
          text_return_to_information
          shipping_methods
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
                text_contact
                text_delivery_address
                text_change
                text_shipping_method
                text_continue_to_payment
                text_return_to_information
                shipping_methods
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

export default checkoutShippingQuery;
