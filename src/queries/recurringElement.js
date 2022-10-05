const recurringElementQuery = `
  {
    recurringElement {
      data {
        id
        attributes {
          locale
          Footer_text
          Company_name
          Company_address
          Company_email
          OpenGraph_default {
            data {
              attributes {
                name
                url
                provider_metadata
                alternativeText
              }
            }
          }
          text_chapter
          text_practices_to_follow
          text_practices
          text_explore_the_world_of_kindness
          recipe_prep
          recipe_cook
          recipe_total
          recipe_jump_to_recipe
          recipe_similar
          recipe_recipe
          recipe_day
          recipe_days
          recipe_hour
          recipe_hours
          recipe_minute
          recipe_minutes
          recipe_nutrition_information
          recipe_yield
          recipe_amount_per_serving
          recipe_ingredients
          recipe_serving_size
          recipe_cooking_instructions
          recipe_tips
          recipe_discover
          estate_location
          product_made_love_form
          product_kindness_impact
          product_add
          product_add_cart
          product_add_cart_for
          product_size
          product_quantity
          localizations {
            data {
              attributes {
                locale
                Footer_text
                Company_name
                Company_address
                Company_email
                OpenGraph_default {
                  data {
                    attributes {
                      name
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                text_chapter
                text_practices_to_follow
                text_practices
                text_explore_the_world_of_kindness
                recipe_prep
                recipe_cook
                recipe_total
                recipe_jump_to_recipe
                recipe_similar
                recipe_recipe
                recipe_day
                recipe_days
                recipe_hour
                recipe_hours
                recipe_minute
                recipe_minutes
                recipe_nutrition_information
                recipe_yield
                recipe_amount_per_serving
                recipe_ingredients
                recipe_serving_size
                recipe_cooking_instructions
                recipe_tips
                recipe_discover
                estate_location
                product_made_love_form
                product_kindness_impact
                product_add
                product_add_cart
                product_add_cart_for
                product_size
                product_quantity
              }
            }
          }
        }
      }
    }
  }
`;

export default recurringElementQuery;
