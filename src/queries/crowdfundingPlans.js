const crowdfundingPlansQuery = `
  {
    crowdfundingPlans(sort: "Price_EUR_excl_VAT") {
      data {
        id
        attributes {
          locale
          Perk
          Title
          TitleIcon_Name
          Title_icon {
            data {
              id
              attributes {
                name
                alternativeText
              }
            }
          }
          Price_EUR_excl_VAT
          Intro_text
          List
          Button_text
          localizations {
            data {
              attributes {
                locale
                Title
                TitleIcon_Name
                Title_icon {
                  data {
                    id
                    attributes {
                      name
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                Price_EUR_excl_VAT
                Intro_text
                List
                Button_text
              }
            }
          }
        }
      }
    }
  }
`;

export default crowdfundingPlansQuery;
