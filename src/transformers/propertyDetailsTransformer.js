exports.transform = (data) => {
  const transformed = { ...data }; // Create a shallow copy of the original data

  // Transform currentMortgages into an object
  if (Array.isArray(data.data.currentMortgages)) {
    const mortgagesObject = {};
    data.data.currentMortgages.forEach((mortgage, index) => {
      mortgagesObject[`mortgage${index + 1}`] = mortgage;
    });
    transformed.data.currentMortgages = mortgagesObject;
  }

  // Transform foreclosureInfo into an object
  if (Array.isArray(data.data.foreclosureInfo)) {
    const foreclosureInfoObject = {};
    data.data.foreclosureInfo.forEach((info, index) => {
      foreclosureInfoObject[`foreclosure${index + 1}`] = info;
    });
    transformed.data.foreclosureInfo = foreclosureInfoObject;
  }

  // Transform mlsHistory into an object
  if (Array.isArray(data.data.mlsHistory)) {
    const mlsHistoryObject = {};
    data.data.mlsHistory.forEach((history, index) => {
      mlsHistoryObject[`mlsHistory${index + 1}`] = history;
    });
    transformed.data.mlsHistory = mlsHistoryObject;
  }

  // Transform mortgageHistory into an object
  if (Array.isArray(data.data.mortgageHistory)) {
    const mortgageHistoryObject = {};
    data.data.mortgageHistory.forEach((history, index) => {
      mortgageHistoryObject[`mortgageHistory${index + 1}`] = history;
    });
    transformed.data.mortgageHistory = mortgageHistoryObject;
  }

  // Transform saleHistory into an object
  if (Array.isArray(data.data.saleHistory)) {
    const saleHistoryObject = {};
    data.data.saleHistory.forEach((sale, index) => {
      saleHistoryObject[`sale${index + 1}`] = sale;
    });
    transformed.data.saleHistory = saleHistoryObject;
  }

  if (Array.isArray(data.data.schools)) {
    const schoolsObject = {};
    data.data.schools.forEach((school, index) => {
      schoolsObject[`school${index + 1}`] = school;
    });
    transformed.data.schools = schoolsObject;
  }

  return transformed;
};
