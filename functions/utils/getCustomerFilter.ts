const getCustomerFilter = (contact: string, isEmail: boolean): string =>
  isEmail
    ? `Email eq '${contact.toLowerCase()}'`
    : `substringof('${contact.slice(1)}', Phone)`;

export default getCustomerFilter;
