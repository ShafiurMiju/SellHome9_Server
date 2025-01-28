exports.transform = (data) => {
  const transformed = { ...data };

  // Transform comps array into an object
  if (Array.isArray(data.comps)) {
    const compsObject = {};
    data.comps.forEach((comp, index) => {
      compsObject[`comp${index + 1}`] = comp;
    });
    transformed.comps = compsObject;
  }

  // Check if the input is an object and recursively transform its properties
  if (data !== null && typeof data === "object") {
    const transformedObject = {};
    Object.keys(data).forEach((key) => {
      transformedObject[key] = transformAllArraysToObjects(data[key]);
    });
    return transformedObject;
  }

  return transformed;
};
