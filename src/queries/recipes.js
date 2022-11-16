const recipesQuery = `
  {
    recipes {
      data {
        id
        attributes {
          localizations {
            data {
              attributes {
                locale
                Title
                Intro_text
                Intro_blob {
                  data {
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                Block_text
                Cuisine
                Category
                Time_preparation
                Time_cooking
                Time_text
                Nutrition{
                  Nutrition_name
                  Nutrition_amount
                  Nutrition_measurements_unit
                }
                Nutrition_yield
                Cooking_part{
                  Cooking_part_name
                  Cooking_part_step_tip
                  Cooking_part_steps {
                    Cooking_part_steps_text
                    Cooking_part_steps_blob{
                      data {
                        attributes {
                          url
                          provider_metadata
                          formats
                          alternativeText
                        }
                      }
                    }
                  }
                  Cooking_part_ingredients {
                    Cooking_part_ingredient_name
                    Cooking_part_ingredient_amount
                    Cooking_part_ingredient_measurements_unit
                  }
                }
                Recipe_variations{
                  data{
                    attributes{
                      Title
                      Meta {
                        URL_slug
                      }
                    }
                  }
                }
                Relevant_recipes{
                  data{
                    attributes{
                      Title
                      Intro_blob {
                        data {
                          attributes {
                            url
                            provider_metadata
                            formats
                            alternativeText
                          }
                        }
                      }
                      authors {
                        data {
                          attributes {
                            givenName
                          }
                        }
                      }
                      createdAt
                      Meta {
                        URL_slug
                      }
                    }
                  }
                }
                createdAt
                updatedAt
                publishedAt
                authors {
                  data {
                    attributes {
                      givenName
                      Profile_picture {
                        data {
                          attributes {
                            url
                            provider_metadata
                            alternativeText
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
          locale
          Title
          Intro_text
          Intro_blob {
            data {
              attributes {
                url
                provider_metadata
                formats
                alternativeText
              }
            }
          }
          Block_text
          Cuisine
          Category
          Time_preparation
          Time_cooking
          Time_text
          Nutrition{
            Nutrition_name
            Nutrition_amount
            Nutrition_measurements_unit
          }
          Nutrition_yield
          Cooking_part{
            Cooking_part_name
            Cooking_part_step_tip
            Cooking_part_steps {
              Cooking_part_steps_text
              Cooking_part_steps_blob{
                data {
                  attributes {
                    url
                    provider_metadata
                    formats
                    alternativeText
                  }
                }
              }
            }
            Cooking_part_ingredients {
              Cooking_part_ingredient_name
              Cooking_part_ingredient_amount
              Cooking_part_ingredient_measurements_unit
            }
          }
          Recipe_variations{
            data{
              attributes{
                Title
                Meta {
                  URL_slug
                }
              }
            }
          }
          Relevant_recipes{
            data{
              attributes{
                Title
                Intro_blob {
                  data {
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                authors {
                  data {
                    attributes {
                      givenName
                    }
                  }
                }
                createdAt
                Meta {
                  URL_slug
                }
              }
            }
          }
          createdAt
          updatedAt
          publishedAt
          authors {
            data {
              attributes {
                givenName
                Profile_picture {
                  data {
                    attributes {
                      url
                      provider_metadata
                      alternativeText
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
`;

export default recipesQuery;
