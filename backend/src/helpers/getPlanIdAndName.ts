export const setPlanByItsId = (priceId: string) => {
  if (priceId == 'price_1Q3MfoHbzmnInIZ1CsBh5rGj') {
    return 'Basic';
  } else if (priceId == 'price_1Q3MiPHbzmnInIZ1kdQAFHqH') {
    return 'Gold';
  } else if (priceId == 'price_1Q3Mh3HbzmnInIZ1QvC4glTC') {
    return 'Standard';
  } else {
    throw new Error('Invalid price ID');
  }
};

export const setPlanByItName = (plan: string) => {
  if (plan == 'Basic') {
    return 'price_1Q3MfoHbzmnInIZ1CsBh5rGj';
  } else if (plan == 'Gold') {
    return 'price_1Q3MiPHbzmnInIZ1kdQAFHqH';
  } else if (plan == 'Standard') {
    return 'price_1Q3Mh3HbzmnInIZ1QvC4glTC';
  } else {
    throw new Error('Invalid plan');
  }
};
