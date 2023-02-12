const checkoutInformationQuery = `
  {
    checkoutInformation {
      data {
        id
        attributes {
          locale
          updatedAt
          checkout_step_order
          Aria_label_form_text
          text_contact_info
          text_shipping_address
          text_email_address
          email_address_placeholder
          text_first_name
          first_name_placeholder
          text_last_name
          last_name_placeholder
          text_country
          country_placeholder          
          text_city
          city_placeholder
          text_street
          street_placeholder
          text_postal_code
          postal_code_placeholder
          text_continue_to_shipping
          text_return_to_cart
          countries {
            data {
              attributes {
                name
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
                Aria_label_form_text
                text_contact_info
                text_shipping_address
                text_email_address
                email_address_placeholder
                text_first_name
                first_name_placeholder
                text_last_name
                last_name_placeholder
                text_country
                country_placeholder
                text_city
                city_placeholder
                text_street
                street_placeholder
                text_postal_code
                postal_code_placeholder
                text_continue_to_shipping
                text_return_to_cart
                countries {
                  data {
                    attributes {
                      name
                      localizations(filters: { locale: { eq: "en" } }) {
                        data {
                          attributes {
                            name
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

export default checkoutInformationQuery;
