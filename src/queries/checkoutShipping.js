const checkoutShippingQuery = `
  {
    checkoutShipping {
      data {
        id
        attributes {
          locale
          updatedAt
          checkout_step_order
          text_contact
          text_delivery_address
          text_change
          text_shipping_method
          text_continue_to_payment
          text_return_to_information
          Aria_label_kindness_delivery_address_form_text
          Aria_label_delivery_address_text
          Aria_label_email_address_text
          Aria_label_change_text
          shipping_methods {
            data {
              attributes {
                method
                cost
                description
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
                text_contact
                text_delivery_address
                text_change
                text_shipping_method
                text_continue_to_payment
                text_return_to_information
                Aria_label_kindness_delivery_address_form_text
                Aria_label_delivery_address_text
                Aria_label_email_address_text
                Aria_label_change_text
                shipping_methods {
                  data {
                    attributes {
                      method
                      cost
                      description
                      localizations(filters: { locale: { eq: "en" } }) {
                        data {
                          attributes {
                            method
                          }
                        }
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

export default checkoutShippingQuery;
