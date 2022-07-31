const AllPagesQuery = `
  {
    recurringElement {
      data {
        id
        attributes {
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
        }
      }
    }
    
    crowdfundingPlans(sort: "Price_EUR_excl_VAT") {
      data {
        id
        attributes {
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
          locale
          Perk
          Title
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
        }
      }
    }

    crowdfundingForm {
      data {
        id
        attributes {
          localizations {
            data {
              attributes {
                locale
                Title
                Intro_text
                Meta {
                  URL_slug
                  HTML_Title
                  Meta_description
                  noindex
                  nofollow
                }
              }
            }
          }
          locale
          Title
          Intro_text
          Meta {
            URL_slug
            HTML_Title
            Meta_description
            noindex
            nofollow
          }
        }
      }
    }

    crowdfundingHome {
      data {
        id
        attributes {
          Intro_blob {
            data {
              id
              attributes {
                url
                provider_metadata
                formats
                alternativeText
              }
            }
          }
          localizations {
            data {
              attributes {
                locale
                Meta {
                  HTML_Title
                  Meta_description
                  noindex
                  nofollow
                  URL_slug
                  Canonical_link
                }
                Title
                Intro_text
                Intro_blob {
                  data {
                    id
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                Heading_button_text
                Heading_button_link
                Heading_goal
                Heading_supporters
                Heading_plans
                Heading_block
                Block_text
                Block_blob {
                  data {
                    id
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    crowdfundingPaymentConfirmation {
      data {
        id
        attributes {
          localizations {
            data {
              attributes {
                locale
                Title
                Intro_text
                Heading_block
                Block_text
                Block_blob {
                  data {
                    id
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
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
          Heading_block
          Block_text
          Block_blob {
            data {
              id
              attributes {
                url
                provider_metadata
                formats
                alternativeText
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

    basicPages {
      data {
        id
        attributes {
          localizations {
            data {
              attributes {
                locale
                Title
                Intro_text
                Heading_block
                Block_text
                Block_blob {
                  data {
                    id
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
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
          Heading_block
          Block_text
          Block_blob {
            data {
              id
              attributes {
                url
                provider_metadata
                formats
                alternativeText
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

    homeBlog {
      data {
        id
        attributes {
          localizations {
            data {
              attributes {
                locale
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

    blogs {
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
                    id
                    attributes {
                      url
                      provider_metadata
                      formats
                      alternativeText
                    }
                  }
                }
                Block_text
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
              id
              attributes {
                url
                provider_metadata
                formats
                alternativeText
              }
            }
          }
          Block_text
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

    i18NLocales {
      data {
        attributes {
          code
        }
      }
    }
  }
`;

export default AllPagesQuery;
