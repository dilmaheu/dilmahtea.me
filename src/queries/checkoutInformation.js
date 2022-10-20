const checkoutInformationQuery = `
  {
    checkoutInformation {
      data {
        id
        attributes {
          locale
          checkout_step_order
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
          countries
          text_city
          city_placeholder
          text_street
          street_placeholder
          text_postal_code
          postal_code_placeholder
          text_continue_to_shipping
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
                countries
                text_city
                city_placeholder
                text_street
                street_placeholder
                text_postal_code
                postal_code_placeholder
                text_continue_to_shipping
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
