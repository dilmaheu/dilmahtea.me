const crowdfundingPlansQuery = `
  {
    crowdfundingPlans(sort: "Price_EUR_excl_VAT") {
      data {
        id
        attributes {
          locale
          updatedAt
          Perk
          Title
          Title_icon {
            data {
              id
              attributes {
                name
                url
                alternativeText
                formats
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
                updatedAt
                Perk
                Title
                Title_icon {
                  data {
                    id
                    attributes {
                      name
                      url
                      alternativeText
                      formats
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
