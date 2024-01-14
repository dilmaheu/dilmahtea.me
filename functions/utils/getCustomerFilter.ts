const getCustomerFilter = (contact: string, isEmail: boolean): string =>
  isEmail
    ? `Email eq '${contact}'`
    : `substringof('${contact.slice(1)}', Phone)`;

export default getCustomerFilter;
