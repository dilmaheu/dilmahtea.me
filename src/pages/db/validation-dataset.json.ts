const query = `
  {
    crowdfundingPlans {
      data {
        attributes {
          Perk
          Price_EUR_excl_VAT
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

    products {
      data {
        attributes {
          locale
          SKU
          Title
          Price
          VatPercentage
          Stock_amount
          localizations {
            data {
              attributes {
                locale
                Title
              }
            }
          }
        }
      }
    }

    countries {
      data {
        attributes {
          name
          code
        }
      }
    }

    kindnessCauses {
      data {
        attributes {
          cause
        }
      }
    }

    shippingMethods {
      data {
        attributes {
          method
          cost
        }
      }
    }

    paymentMethods {
      data {
        attributes {
          method
          supported_countries {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const { STRAPI_ACCESS_TOKEN, STRAPI_GRAPHQL_ENDPOINT } = import.meta.env;

const { data: validationDataset } = await fetch(STRAPI_GRAPHQL_ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_ACCESS_TOKEN}`,
  },
  body: JSON.stringify({ query }),
}).then((response) => response.json());

export function GET() {
  return new Response(JSON.stringify(validationDataset));
}
