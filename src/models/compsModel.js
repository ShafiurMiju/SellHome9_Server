const mysql = require("mysql2/promise");
const dbConfig = require("../config/dbConfig");

const insertComps = async (payload) => {
  const connection = await getConnection();

  try {
    if (payload.comps) {
      const compsListData = payload.comps || {};

      const allComps = Object.keys(compsListData).map((key) => {
        const comps = compsListData[key];

        return {
          compsId: comps.id,
          sqFt: comps.sqFt || null,
          bed: comps.bedrooms || null,
          bath: comps.bathrooms || null,
          lotSqFt: comps.lotSquareFeet || null,
          yearBuilt: comps.yearBuilt || null,
          distance: comps.distance || null,

          address: comps.address || null,
        };
      });

      for (const comps of allComps) {
        try {
          // Insert new Comps data
          const query = `
              INSERT INTO compsData  (
                compsId, sqFt, bed, bath, lotSqFt,
                yearBuilt, distance
              ) VALUES (?, ?, ?, ?, ?, ?, ?)
              `;
          const values = [
            comps.compsId,
            comps.sqFt,
            comps.bed,
            comps.bath,
            comps.lotSqFt,
            comps.yearBuilt,
            comps.distance,
          ];

          const [result] = await connection.execute(query, values);

          if (result?.affectedRows > 0) {
            console.log(`Inserted compsData with DB ID: ${comps.compsId}`);
            //...................................................
            //compsAddress
            try {
              // Insert new Comps data
              const compsAddressQuery = `
                  INSERT INTO compsAddress  (
                    compsId, address, street, city, state,
                    zip, county
                  ) VALUES (?, ?, ?, ?, ?, ?, ?)
                  `;
              const compsAddressValues = [
                comps.compsId,
                comps.address.address,
                comps.address.street,
                comps.address.city,
                comps.address.state,
                comps.address.zip,
                comps.address.county,
              ];
              const [result] = await connection.execute(
                compsAddressQuery,
                compsAddressValues
              );
              if (result?.affectedRows > 0) {
                console.log(
                  `Inserted compsAddress for compsID: ${comps.compsId}`
                );
              } else {
                console.log("compsAddress data insert error");
              }
            } catch (error) {
              console.error("Error inserting compsAddress:", error.message);
            }
          } else {
            console.log("compsData data insert error");
          }
        } catch (error) {
          console.error("Error inserting comps:", error.message);
        }

        try {
          const [result] = await connection.execute(
            `SELECT * FROM comps WHERE propertyId = ? AND compsId = ?`,
            [payload.subject.id, comps.compsId]
          );

          console.log("Select: ", result.length);

          if (result.length > 0) {
            console.log("Data axist");
          } else {
            try {
              const compsQuery = `
                  INSERT INTO comps  (
                    propertyId, compsId
                  ) VALUES (?, ?)
                  `;
              const compsValues = [payload.subject.id, comps.compsId];

              const [result] = await connection.execute(
                compsQuery,
                compsValues
              );

              if (result?.affectedRows > 0) {
                console.log(
                  `Inserted comps with for property ID: ${payload.subject.id} with compsId ${comps.compsId}`
                );
              } else {
                console.log("comps data insert error");
              }
            } catch (error) {
              console.error("Error inserting comps:", error.message);
            }
          }
        } catch (error) {
          console.error("Error searching comps:", error.message);
        }
      }

      // Close the database connection
      await connection.end();

      console.log("Success");

      res.json({
        messageAPI: "Property comps data processed successfully",
      });
    }
  } catch (error) {
    console.error("Error inserting comps:", error.message);
    throw new Error("Failed to insert comps data");
  } finally {
    await connection.end();
  }
};

module.exports = {
  insertComps,
};
