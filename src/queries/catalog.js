const catalogQuery = `
  {
    catalog {
      data {
        id
        attributes {
          Products {
            Title
            products {
              data {
                attributes {
                  locale
                  updatedAt
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
                  variant {
                    data {
                      attributes {
                        Title
                      }
                    }
                  }
                  size {
                    data {
                      attributes {
                        Title
                      }
                    }
                  }
                  Block_text
                  Price
                  Currency
                  Stock_amount
                  In_stock_date
                  SKU
                  GTIN_Barcode
                  Weight
                  Weight_unit
                  Weight_tea
                  Weight_tea_unit
                  Price_breakdown_text
                  Price_breakdown {
                    Item_name
                    Item_color_code
                    Spent_amount
                    Currency
                  }
                  Transparency_text
                  Transparency {
                    Transparency_item_title
                    Transparency_item_text
                    Transparency_item_icon {
                      data {
                        attributes {
                          url
                          provider_metadata
                          alternativeText
                        }
                      }
                    }
                  }
                  Impact_text
                  Impact {
                    Impact_item_title
                    Impact_item_text
                    Impact_item_icon {
                      data {
                        attributes {
                          url
                          provider_metadata
                          alternativeText
                        }
                      }
                    }
                  }
                  createdAt
                  brand {
                    data {
                      attributes {
                        Brand_name
                      }
                    }
                  }
                  product_infos {
                    data {
                      attributes {
                        Product_info_title
                        Product_info_icon {
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
                  estate_name {
                    data {
                      attributes {
                        Estate_name
                        Meta {
                          URL_slug
                        }
                      }
                    }
                  }
                  related_blogs {
                    data {
                      attributes {
                        Title
                        Intro_blob {
                          data {
                            attributes {
                              url
                              provider_metadata
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
                  related_recipes {
                    data {
                      attributes {
                        Title
                        Intro_blob {
                          data {
                            attributes {
                              url
                              provider_metadata
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
                  related_how_tos {
                    data {
                      attributes {
                        Title
                        Intro_blob {
                          data {
                            attributes {
                              url
                              provider_metadata
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
                  related_products {
                    data {
                      attributes {
                        Title
                        Intro_text
                        Intro_blob {
                          data {
                            attributes {
                              url
                              provider_metadata
                              alternativeText
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
                      id
                      attributes {
                        locale
                        updatedAt
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
                        variant {
                          data {
                            attributes {
                              Title
                            }
                          }
                        }
                        size {
                          data {
                            attributes {
                              Title
                            }
                          }
                        }
                        Block_text
                        Price
                        Currency
                        Stock_amount
                        In_stock_date
                        SKU
                        GTIN_Barcode
                        Weight
                        Weight_unit
                        Weight_tea
                        Weight_tea_unit
                        Price_breakdown_text
                        Price_breakdown {
                          Item_name
                          Item_color_code
                          Spent_amount
                          Currency
                        }
                        Transparency_text
                        Transparency {
                          Transparency_item_title
                          Transparency_item_text
                          Transparency_item_icon {
                            data {
                              attributes {
                                url
                                provider_metadata
                                alternativeText
                              }
                            }
                          }
                        }
                        Impact_text
                        Impact {
                          Impact_item_title
                          Impact_item_text
                          Impact_item_icon {
                            data {
                              attributes {
                                url
                                provider_metadata
                                alternativeText
                              }
                            }
                          }
                        }
                        createdAt
                        brand {
                          data {
                            attributes {
                              Brand_name
                            }
                          }
                        }
                        product_infos {
                          data {
                            attributes {
                              Product_info_title
                              Product_info_icon {
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
                        estate_name {
                          data {
                            attributes {
                              Estate_name
                              Meta {
                                URL_slug
                              }
                            }
                          }
                        }
                        related_blogs {
                          data {
                            attributes {
                              Title
                              Intro_blob {
                                data {
                                  attributes {
                                    url
                                    provider_metadata
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
                        related_recipes {
                          data {
                            attributes {
                              Title
                              Intro_blob {
                                data {
                                  attributes {
                                    url
                                    provider_metadata
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
                        related_how_tos {
                          data {
                            attributes {
                              Title
                              Intro_blob {
                                data {
                                  attributes {
                                    url
                                    provider_metadata
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
                        related_products {
                          data {
                            attributes {
                              Title
                              Intro_text
                              Intro_blob {
                                data {
                                  attributes {
                                    url
                                    provider_metadata
                                    alternativeText
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
        }
      }
    }
  }
`;

export default catalogQuery;
