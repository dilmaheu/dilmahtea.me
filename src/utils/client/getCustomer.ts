export default function getCustomer(paymentData) {
  const {
    email,
    first_name,
    last_name,
    country,
    city,
    street,
    postal_code,
    billing_first_name,
    billing_last_name,
    billing_country,
    billing_city,
    billing_street,
    billing_postal_code,
  } = paymentData;

  const countryCode = window.countryCodesMap[country],
    billingCoutryCode = window.countryCodesMap[billing_country];

  const customer = {
    email,
    name: billing_first_name + " " + billing_last_name,
    address: {
      country: billingCoutryCode,
      city: billing_city,
      postal_code: billing_postal_code,
      line1: billing_street,
    },
    shipping: {
      name: first_name + " " + last_name,
      address: {
        country: countryCode,
        city,
        postal_code,
        line1: street,
      },
    },
  };

  return customer;
}
