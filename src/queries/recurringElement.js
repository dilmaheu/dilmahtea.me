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
          Nav_menu {
            Visibility
            Title
            Link
          }
          Nav_menu_search_visibility
          Nav_menu_language_selector_visibility
          Nav_menu_cart_visibility
          Nav_menu_cart_icon {
            data {
              attributes {
                url
                provider_metadata
                alternativeText
              }
            }
          }
          Nav_menu_profile_visibility
          Nav_menu_profile_icon {
            data {
              attributes {
                url
                provider_metadata
                alternativeText
              }
            }
          }
          Footer_menu {
            Visibility
            Title
            Link
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
          text_content
          product_made_love_from
          product_kindness_impact
          product_each_penny_you_spend
          product_check_where_going
          product_price_breakdown_title
          product_transparency_title
          product_impact_title
          Item_stock_text
          Product_sold_out_text
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
                Nav_menu {
                  Visibility
                  Title
                  Link
                }
                Nav_menu_search_visibility
                Nav_menu_language_selector_visibility
                Nav_menu_cart_visibility
                Nav_menu_cart_icon {
                  data {
                    attributes {
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                Nav_menu_profile_visibility
                Nav_menu_profile_icon {
                  data {
                    attributes {
                      url
                      provider_metadata
                      alternativeText
                    }
                  }
                }
                Footer_menu {
                  Visibility
                  Title
                  Link
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
                text_content
                product_made_love_from
                product_kindness_impact
                product_each_penny_you_spend
                product_check_where_going
                product_price_breakdown_title
                product_transparency_title
                product_impact_title
                Item_stock_text
                Product_sold_out_text
              }
            }
          }
        }
      }
    }
  }
`;

export default recurringElementQuery;
