"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPlanByItName = exports.setPlanByItsId = void 0;
const setPlanByItsId = (priceId) => {
    if (priceId == 'price_1Q3MfoHbzmnInIZ1CsBh5rGj') {
        return 'Basic';
    }
    else if (priceId == 'price_1Q3MiPHbzmnInIZ1kdQAFHqH') {
        return 'Premium';
    }
    else if (priceId == 'price_1Q3Mh3HbzmnInIZ1QvC4glTC') {
        return 'Standard';
    }
    else {
        throw new Error('Invalid price ID');
    }
};
exports.setPlanByItsId = setPlanByItsId;
const setPlanByItName = (plan) => {
    if (plan == 'Basic') {
        return 'price_1Q3MfoHbzmnInIZ1CsBh5rGj';
    }
    else if (plan == 'Premium') {
        return 'price_1Q3MiPHbzmnInIZ1kdQAFHqH';
    }
    else if (plan == 'Standard') {
        return 'price_1Q3Mh3HbzmnInIZ1QvC4glTC';
    }
    else {
        throw new Error('Invalid plan');
    }
};
exports.setPlanByItName = setPlanByItName;
//# sourceMappingURL=getPlanIdAndName.js.map