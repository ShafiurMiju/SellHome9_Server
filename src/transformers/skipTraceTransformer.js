exports.transform = (data) => {
  const transformed = { ...data }; // Create a shallow copy of the original data

  // Ensure nested objects exist before modifying
  transformed.output.identity = transformed.output.identity || {};
  transformed.output.demographics = transformed.output.demographics || {};
  transformed.output.relationships = transformed.output.relationships || {};

  // Transform `identity.names` into an object
  if (Array.isArray(data.output.identity.names)) {
    const namesObject = {};
    data.output.identity.names.forEach((name, index) => {
      namesObject[`name${index + 1}`] = name;
    });
    transformed.output.identity.names = namesObject;
  }

  // Transform `identity.phones` into an object
  if (Array.isArray(data.output.identity.phones)) {
    const phonesObject = {};
    data.output.identity.phones.forEach((phone, index) => {
      phonesObject[`phone${index + 1}`] = phone;
    });
    transformed.output.identity.phones = phonesObject;
  }

  // Transform `identity.addressHistory` into an object
  if (Array.isArray(data.output.identity.addressHistory)) {
    const addressHistoryObject = {};
    data.output.identity.addressHistory.forEach((address, index) => {
      addressHistoryObject[`address${index + 1}`] = address;
    });
    transformed.output.identity.addressHistory = addressHistoryObject;
  }

  // Transform `identity.emails` into an object
  if (Array.isArray(data.output.identity.emails)) {
    const emailsObject = {};
    data.output.identity.emails.forEach((email, index) => {
      emailsObject[`email${index + 1}`] = email;
    });
    transformed.output.identity.emails = emailsObject;
  }

  // Transform `relationships` into an object
  if (Array.isArray(data.output.relationships)) {
    const relationshipsObject = {};
    data.output.relationships.forEach((relationship, index) => {
      relationshipsObject[`relationship${index + 1}`] = relationship;
    });
    transformed.output.relationships = relationshipsObject;
  }

  // Transform `demographics.social` into an object
  if (Array.isArray(data.output.demographics.social)) {
    const socialProfilesObject = {};
    data.output.demographics.social.forEach((social, index) => {
      socialProfilesObject[`socialProfile${index + 1}`] = social;
    });
    transformed.output.demographics.social = socialProfilesObject;
  }

  // Transform `demographics.jobs` into an object
  if (Array.isArray(data.output.demographics.jobs)) {
    const jobsObject = {};
    data.output.demographics.jobs.forEach((job, index) => {
      jobsObject[`job${index + 1}`] = job;
    });
    transformed.output.demographics.jobs = jobsObject;
  }

  // Transform `demographics.images` into an object
  if (Array.isArray(data.output.demographics.images)) {
    const imagesObject = {};
    data.output.demographics.images.forEach((image, index) => {
      imagesObject[`image${index + 1}`] = image;
    });
    transformed.output.demographics.images = imagesObject;
  }

  // Transform `demographics.education` into an object
  if (Array.isArray(data.output.demographics.education)) {
    const educationObject = {};
    data.output.demographics.education.forEach((education, index) => {
      educationObject[`education${index + 1}`] = education;
    });
    transformed.output.demographics.education = educationObject;
  }

  // Transform `demographics.names` into an object
  if (Array.isArray(data.output.demographics.names)) {
    const demoNamesObject = {};
    data.output.demographics.names.forEach((name, index) => {
      demoNamesObject[`name${index + 1}`] = name;
    });
    transformed.output.demographics.names = demoNamesObject;
  }

  return transformed;
};
