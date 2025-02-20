const connectDB = require("../config/dbConfig"); // Updated path for clarity


const insertProperty = async (payload) => {
  try {
    // Establish a database connection
    const connection = await connectDB();

    console.log("Database connected successfully!");

    //For Property Table
    const property = {
      propertyId: payload.data?.id,
      MFH2to4: payload.data?.MFH2to4,
      MFH5plus: payload.data?.MFH5plus,
      absenteeOwner: payload.data?.absenteeOwner,
      adjustableRate: payload.data?.adjustableRate,
      assumable: payload.data?.assumable,
      auction: payload.data?.auction,
      equity: payload.data?.equity || null,
      bankOwned: payload.data?.bankOwned || null,
      cashBuyer: payload.data?.cashBuyer,
      cashSale: payload.data?.cashSale,
      corporateOwned: payload.data?.corporateOwned,
      death: payload.data?.death,
      deathTransfer: payload.data?.deathTransfer,
      deedInLieu: payload.data?.deedInLieu,
      equityPercent: payload.data?.equityPercent || null,
      estimatedEquity: payload.data?.estimatedEquity || null,
      estimatedMortgageBalance: payload.data?.estimatedMortgageBalance || null,
      estimatedMortgagePayment: payload.data?.estimatedMortgagePayment || null,
      estimatedValue: payload.data?.estimatedValue || null,
      floodZone: payload.data?.floodZone,
      floodZoneDescription: payload.data?.floodZoneDescription || null,
      floodZoneType: payload.data?.floodZoneType || null,
      freeClear: payload.data?.freeClear,
      highEquity: payload.data?.highEquity,
      inStateAbsenteeOwner: payload.data?.inStateAbsenteeOwner,
      inherited: payload.data?.inherited,
      investorBuyer: payload.data?.investorBuyer,
      judgment: payload.data?.judgment,
      lastSaleDate: payload.data?.lastSaleDate || null,
      lastSalePrice: payload.data?.lastSalePrice || null,
      lastUpdateDate: payload.data?.lastUpdateDate?.split(" ")[0], // Format date to YYYY-MM-DD
      lien: payload.data?.lien,
      loanTypeCodeFirst: payload.data?.loanTypeCodeFirst || null,
      loanTypeCodeSecond: payload.data?.loanTypeCodeSecond,
      loanTypeCodeThird: payload.data?.loanTypeCodeThird,
      maturityDateFirst: payload.data?.maturityDateFirst?.split("T")[0] || null, // Format date to YYYY-MM-DD
      mlsActive: payload.data?.mlsActive,
      mlsCancelled: payload.data?.mlsCancelled,
      mlsDaysOnMarket: payload.data?.mlsDaysOnMarket || null,
      mlsFailed: payload.data?.mlsFailed,
      mlsFailedDate: payload.data?.mlsFailedDate,
      mlsHasPhotos: payload.data?.mlsHasPhotos,
      mlsLastSaleDate: payload.data?.mlsLastSaleDate?.split("T")[0] || null, // Format date to YYYY-MM-DD
      mlsLastStatusDate: payload.data?.mlsLastStatusDate?.split("T")[0] || null, // Format date to YYYY-MM-DD
      mlsListingDate: payload.data?.mlsListingDate?.split("T")[0] || null, // Format date to YYYY-MM-DD
      mlsListingPrice: payload.data?.mlsListingPrice,
      mlsListingPricePerSquareFoot:
        payload.data?.mlsListingPricePerSquareFoot || null,
      mlsPending: payload.data?.mlsPending,
      mlsSold: payload.data?.mlsSold,
      mlsSoldPrice: payload.data?.mlsSoldPrice,
      mlsStatus: payload.data?.mlsStatus || null,
      mlsTotalUpdates: payload.data?.mlsTotalUpdates,
      mlsType: payload.data?.mlsType || null,
      mobileHome: payload.data?.mobileHome,
      noticeType: payload.data?.noticeType,
      openMortgageBalance: payload.data?.openMortgageBalance,
      outOfStateAbsenteeOwner: payload.data?.outOfStateAbsenteeOwner,
      ownerOccupied: payload.data?.ownerOccupied,
      preForeclosure: payload.data?.preForeclosure,
      privateLender: payload.data?.privateLender,
      propertyType: payload.data?.propertyType || null,
      quitClaim: payload.data?.quitClaim,
      reapi_loaded_at: payload.data?.reapi_loaded_at || null,
      sheriffsDeed: payload.data?.sheriffsDeed,
      spousalDeath: payload.data?.spousalDeath,
      taxLien: payload.data?.taxLien,
      trusteeSale: payload.data?.trusteeSale,
      vacant: payload.data?.vacant,
      warrantyDeed: payload.data?.warrantyDeed,
    };

    const keys = Object.keys(property).join(", ");

    const placeholders = Object.keys(property)
      .map(() => "?")
      .join(", ");
    const values = Object.values(property);

    const query = `INSERT INTO property (${keys}) VALUES (${placeholders})`;

    const [result] = await connection.execute(query, values);

    await connection.end();

    //console.log("Result:", result.insertId);

    // Check if result.insertId exists
    if (result.insertId !== null) {
      // Final response for successful query execution
      console.log("Property detail data processed and inserted successfully");
      // ..................................................................................
      //Mortgage data
      if (payload.data?.mortgageHistory) {
        const mortgageHistoryData = payload.data?.mortgageHistory || {};

        // Extract all mortgages dynamically
        const allMortgages = Object.keys(mortgageHistoryData).map((key) => {
          const mortgage = mortgageHistoryData[key]; // Access each mortgage (e.g., mortgageHistory1, mortgageHistory2)

          return {
            propertyId: payload.data?.id, // Assuming propertyId is available in payload.data
            amount: mortgage?.amount || null, // Dynamically extract amount
            assumable: mortgage?.assumable || null,
            book: mortgage?.book || null,
            page: mortgage?.page || null,
            documentNumber: mortgage?.documentNumber || null,
            deedType: mortgage?.deedType || null,
            documentDate: mortgage?.documentDate?.split("T")[0] || null, // Format date to YYYY-MM-DD
            granteeName: mortgage?.granteeName || null,
            interestRate: mortgage?.interestRate || null,
            interestRateType: mortgage?.interestRateType || null,
            lenderCode: mortgage?.lenderCode || null,
            lenderName: mortgage?.lenderName || null,
            lenderType: mortgage?.lenderType || null,
            loanType: mortgage?.loanType || null,
            loanTypeCode: mortgage?.loanTypeCode || null,
            maturityDate: mortgage?.maturityDate?.split("T")[0], // Format date to YYYY-MM-DD
            position: mortgage?.position || null,
            recordingDate: mortgage?.recordingDate?.split("T")[0], // Format date to YYYY-MM-DD
            seqNo: mortgage?.seqNo || null,
            term: mortgage?.term || null,
            termType: mortgage?.termType || null,
            transactionType: mortgage?.transactionType || null,
          };
        });

        //console.log(allMortgages);

        // Insert each mortgage into the database
        for (const mortgage of allMortgages) {
          const query = `
        INSERT INTO mortgageHistory (
          propertyId, amount, assumable, book, page, documentNumber, deedType,
          documentDate, granteeName, interestRate, interestRateType, lenderCode,
          lenderName, lenderType, loanType, loanTypeCode, maturityDate, position,
          recordingDate, seqNo, term, termType, transactionType
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
          const values = [
            mortgage.propertyId,
            mortgage.amount,
            mortgage.assumable,
            mortgage.book,
            mortgage.page,
            mortgage.documentNumber,
            mortgage.deedType,
            mortgage.documentDate,
            mortgage.granteeName,
            mortgage.interestRate,
            mortgage.interestRateType,
            mortgage.lenderCode,
            mortgage.lenderName,
            mortgage.lenderType,
            mortgage.loanType,
            mortgage.loanTypeCode,
            mortgage.maturityDate,
            mortgage.position,
            mortgage.recordingDate,
            mortgage.seqNo,
            mortgage.term,
            mortgage.termType,
            mortgage.transactionType,
          ];

          //console.log(values)

          // Execute the query
          const [result] = await connection.execute(query, values);
          if (result !== null) {
            console.log(
              `Inserted mortgage with ID: ${mortgage.mortgageId}, DB ID: ${result.insertId}`
            );
          } else {
            console.log("Mortgage data insert error");
          }
        }
      }

      // ..................................................................................
      //Demographics data
      if (payload.data?.demographics) {
        const demographics = {
          propertyId: payload.data?.id,
          fmrEfficiency: payload.data.demographics?.fmrEfficiency || null,
          fmrFourBedroom: payload.data.demographics?.fmrFourBedroom || null,
          fmrOneBedroom: payload.data.demographics?.fmrOneBedroom || null,
          fmrThreeBedroom: payload.data.demographics?.fmrThreeBedroom || null,
          fmrTwoBedroom: payload.data.demographics?.fmrTwoBedroom || null,
          fmrYear: payload.data.demographics?.fmrYear || null,
          hudAreaCode: payload.data.demographics?.hudAreaCode || null,
          hudAreaName: payload.data.demographics?.hudAreaName || null,
          medianIncome: payload.data.demographics?.medianIncome || null,
          suggestedRent: payload.data.demographics?.suggestedRent || null,
        };

        const demographicsKeys = Object.keys(demographics).join(", ");
        const demographicsKeysPlaceholders = Object.keys(demographics)
          .map(() => "?")
          .join(", ");
        const values = Object.values(demographics);

        const query = `INSERT INTO demographics (${demographicsKeys}) VALUES (${demographicsKeysPlaceholders})`;

        // Execute the query
        const [result] = await connection.execute(query, values);
        if (result !== null) {
          console.log(`Inserted demographics with DB ID: ${result.insertId}`);
        } else {
          console.log("demographics data insert error");
        }
      }

      //.........................................................................
      // LotInfo data
      if (payload.data?.lotInfo) {
        const lotInfo = {
          propertyId: payload.data?.id,
          apn: payload.data.lotInfo?.apn || null,
          apnUnformatted: payload.data.lotInfo?.apnUnformatted || null,
          censusBlock: payload.data.lotInfo?.censusBlock || null,
          censusBlockGroup: payload.data.lotInfo?.censusBlockGroup || null,
          censusTract: payload.data.lotInfo?.censusTract || null,
          landUse: payload.data.lotInfo?.landUse || null,
          legalDescription: payload.data.lotInfo?.legalDescription || null,
          legalSection: payload.data.lotInfo?.legalSection || null,
          lotAcres: payload.data.lotInfo?.lotAcres || null,
          lotNumber: payload.data.lotInfo?.lotNumber || null,
          lotSquareFeet: payload.data.lotInfo?.lotSquareFeet || null,
          propertyClass: payload.data.lotInfo?.propertyClass || null,
          propertyUse: payload.data.lotInfo?.propertyUse || null,
          subdivision: payload.data.lotInfo?.subdivision || null,
          zoning: payload.data.lotInfo?.zoning || null,
        };

        // Dynamically generate keys and placeholders
        const lotInfoKeys = Object.keys(lotInfo).join(", ");
        const lotInfoKeysPlaceholders = Object.keys(lotInfo)
          .map(() => "?")
          .join(", ");
        const lotInfoValues = Object.values(lotInfo);

        // Prepare the query
        const lotInfoQuery = `INSERT INTO lotInfo (${lotInfoKeys}) VALUES (${lotInfoKeysPlaceholders})`;

        try {
          // Execute the query
          const [result] = await connection.execute(
            lotInfoQuery,
            lotInfoValues
          );
          if (result?.affectedRows > 0) {
            console.log(`Inserted lotInfo with DB ID: ${result.insertId}`);
          } else {
            console.log("lotInfo data insert error");
          }
        } catch (error) {
          console.error(
            "Error inserting lotInfo:",
            error.message,
            "For:",
            lotInfo
          );
        }
      }

      //......................................................
      //mlsHistory
      if (payload.data?.mlsHistory) {
        const mlsHistoryData = payload.data.mlsHistory || {};

        // Extract all mortgages dynamically
        const allMlsHistory = Object.keys(mlsHistoryData).map((key) => {
          const mls = mlsHistoryData[key]; // Access each mlsHistory (e.g., mlsHistory1, mlsHistory2)

          return {
            propertyId: mls?.propertyId, // Assuming propertyId is available in each MLS history
            agentEmail: mls?.agentEmail || null,
            agentName: mls?.agentName || null,
            agentOffice: mls?.agentOffice || null,
            agentPhone: mls?.agentPhone || null,
            baths: mls?.baths || null,
            beds: mls?.beds || null,
            daysOnMarket: mls?.daysOnMarket || null,
            lastStatusDate: mls?.lastStatusDate?.split("T")[0], // Format date to YYYY-MM-DD
            price: mls?.price || null,
            seqNo: mls?.seqNo || null,
            status: mls?.status || null,
            statusDate: mls?.statusDate?.split("T")[0], // Format date to YYYY-MM-DD
            type: mls?.type || null,
          };
        });

        //console.log(allMortgages);

        // Insert each mortgage into the database
        // Insert each MLS history into the database
        for (const mls of allMlsHistory) {
          try {
            const query = `
        INSERT INTO mlsHistory (
          propertyId, agentEmail, agentName, agentOffice, agentPhone, baths, beds,
          daysOnMarket, lastStatusDate, price, seqNo, status, statusDate, type
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

            const values = [
              mls.propertyId,
              mls.agentEmail,
              mls.agentName,
              mls.agentOffice,
              mls.agentPhone,
              mls.baths,
              mls.beds,
              mls.daysOnMarket,
              mls.lastStatusDate,
              mls.price,
              mls.seqNo,
              mls.status,
              mls.statusDate,
              mls.type,
            ];

            // Debug logs
            //console.log("Values being passed to the mlsHistory query:", values);

            const [result] = await connection.execute(query, values);

            if (result?.affectedRows > 0) {
              console.log(
                `Inserted MLS history for propertyId: ${mls.propertyId}, DB ID: ${result.insertId}`
              );
            } else {
              console.error("Failed to insert MLS history:", mls);
            }
          } catch (error) {
            console.error("Error inserting MLS history:", error.message);
          }
        }
      }

      //.......................................
      //Sale History
      if (payload.data?.saleHistory) {
        const saleHistoryData = payload.data.saleHistory;

        // Extract all sale history dynamically
        const allSaleHistory = Object.keys(saleHistoryData).map((key) => {
          const sale = saleHistoryData[key]; // Access each saleHistory (e.g., sale1, sale2)

          return {
            propertyId: payload.data?.id,
            book: sale?.book || null,
            page: sale?.page || null,
            documentNumber: sale?.documentNumber || null,
            armsLength: sale?.armsLength,
            buyerNames: sale?.buyerNames || null,
            documentType: sale?.documentType || null,
            documentTypeCode: sale?.documentTypeCode || null,
            downPayment: sale?.downPayment || null,
            ltv: sale?.ltv || null,
            ownerIndividual: sale?.ownerIndividual,
            purchaseMethod: sale?.purchaseMethod || null,
            recordingDate: sale?.recordingDate?.split("T")[0], // Format date to YYYY-MM-DD
            saleAmount: sale?.saleAmount || null,
            saleDate: sale?.saleDate?.split("T")[0], // Format date to YYYY-MM-DD
            sellerNames: sale?.sellerNames || null,
            seqNo: sale?.seqNo || null,
            transactionType: sale?.transactionType || null,
          };
        });

        // Insert each sale history into the database
        for (const sale of allSaleHistory) {
          try {
            const query = `
            INSERT INTO salesHistory (
              propertyId, book, page, documentNumber, armsLength, buyerNames,
              documentType, documentTypeCode, downPayment, ltv, ownerIndividual,
              purchaseMethod, recordingDate, saleAmount, saleDate, sellerNames,
              seqNo, transactionType
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

            const values = [
              sale.propertyId,
              sale.book,
              sale.page,
              sale.documentNumber,
              sale.armsLength,
              sale.buyerNames,
              sale.documentType,
              sale.documentTypeCode,
              sale.downPayment,
              sale.ltv,
              sale.ownerIndividual,
              sale.purchaseMethod,
              sale.recordingDate,
              sale.saleAmount,
              sale.saleDate,
              sale.sellerNames,
              sale.seqNo,
              sale.transactionType,
            ];

            // Debug logs
            // console.log(
            //   "Values being passed to the saleHistory query:",
            //   values
            // );

            const [result] = await connection.execute(query, values);

            if (result?.affectedRows > 0) {
              console.log(
                `Inserted saleHistory for propertyId: ${sale.propertyId}, DB ID: ${result.insertId}`
              );
            } else {
              console.error("Failed to insert saleHistory:", sale);
            }
          } catch (error) {
            console.error("Error inserting saleHistory:", error.message);
          }
        }
      }

      //.........................................................................
      //School
      if (payload.data?.schools) {
        const schoolsData = payload.data.schools;

        // Extract all schools dynamically
        const allSchools = Object.keys(schoolsData).map((key) => {
          const school = schoolsData[key]; // Access each school (e.g., school1, school2)

          return {
            propertyId: payload.data?.id, // Assuming propertyId is available in payload.data
            city: school?.city || null,
            enrollment: school?.enrollment || null,
            grades: school?.grades || null,
            elementary: school?.levels?.elementary,
            high: school?.levels?.high,
            middle: school?.levels?.middle,
            preschool: school?.levels?.preschool,
            location: school?.location || null,
            name: school?.name || null,
            parentRating: school?.parentRating || null,
            rating: school?.rating || null,
            state: school?.state || null,
            street: school?.street || null,
            type: school?.type || null,
            zip: school?.zip || null,
          };
        });

        // Insert each school into the database
        for (const school of allSchools) {
          try {
            const query = `
            INSERT INTO schoolInfo (
              propertyId, city, enrollment, grades, elementary, high, middle,
              preschool, location, name, parentRating, rating, state, street, type, zip
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ST_GeomFromText(?), ?, ?, ?, ?, ?, ?, ?)
          `;

            const values = [
              school.propertyId,
              school.city,
              school.enrollment,
              school.grades,
              school.elementary,
              school.high,
              school.middle,
              school.preschool,
              school.location,
              school.name,
              school.parentRating,
              school.rating,
              school.state,
              school.street,
              school.type,
              school.zip,
            ];

            // Debug logs
            //console.log("Values being passed to the schools query:", values);

            const [result] = await connection.execute(query, values);

            if (result?.affectedRows > 0) {
              console.log(
                `Inserted school for propertyId: ${school.propertyId}, DB ID: ${result.insertId}`
              );
            } else {
              console.error("Failed to insert school:", school);
            }
          } catch (error) {
            console.error("Error inserting school:", error.message);
          }
        }
      }

      //...........................................................................
      //property Address
      if (payload.data?.propertyInfo?.address) {
        const propertyAddress = {
          propertyId: payload.data?.id,
          address: payload.data.propertyInfo?.address?.address || null,
          carrierRoute:
            payload.data.propertyInfo?.address?.carrierRoute || null,
          city: payload.data.propertyInfo?.address?.city || null,
          congressionalDistrict:
            payload.data.propertyInfo?.address?.congressionalDistrict || null,
          county: payload.data.propertyInfo?.address?.county || null,
          fips: payload.data.propertyInfo?.address?.fips || null,
          house: payload.data.propertyInfo?.address?.house || null,
          jurisdiction:
            payload.data.propertyInfo?.address?.jurisdiction || null,
          label: payload.data.propertyInfo?.address?.label || null,
          preDirection:
            payload.data.propertyInfo?.address?.preDirection || null,
          state: payload.data.propertyInfo?.address?.state || null,
          street: payload.data.propertyInfo?.address?.street || null,
          streetType: payload.data.propertyInfo?.address?.streetType || null,
          unit: payload.data.propertyInfo?.address?.unit || null,
          unitType: payload.data.propertyInfo?.address?.unitType || null,
          zip: payload.data.propertyInfo?.address?.zip || null,
          zip4: payload.data.propertyInfo?.address?.zip4 || null,
        };

        const addressKeys = Object.keys(propertyAddress).join(", ");
        const addressPlaceholders = Object.keys(propertyAddress)
          .map(() => "?")
          .join(", ");
        const values = Object.values(propertyAddress);

        const query = `INSERT INTO propertyAddress (${addressKeys}) VALUES (${addressPlaceholders})`;

        const [result] = await connection.execute(query, values);
        if (result !== null) {
          console.log(
            `Inserted property address with DB ID: ${result.insertId}`
          );
        } else {
          console.log("Property address insert error");
        }
      }

      //...........................................................
      //property info
      if (payload.data?.propertyInfo) {
        const propertyInfo = {
          propertyId: payload.data?.id,
          airConditioningType:
            payload.data.propertyInfo?.airConditioningType || null,
          attic: payload.data.propertyInfo?.attic,
          basementFinishedPercent:
            payload.data.propertyInfo?.basementFinishedPercent || null,
          basementSquareFeet:
            payload.data.propertyInfo?.basementSquareFeet || null,
          basementSquareFeetFinished:
            payload.data.propertyInfo?.basementSquareFeetFinished || null,
          basementSquareFeetUnfinished:
            payload.data.propertyInfo?.basementSquareFeetUnfinished || null,
          basementType: payload.data.propertyInfo?.basementType || null,
          bathrooms: payload.data.propertyInfo?.bathrooms || null,
          bedrooms: payload.data.propertyInfo?.bedrooms || null,
          breezeway: payload.data.propertyInfo?.breezeway,
          buildingSquareFeet:
            payload.data.propertyInfo?.buildingSquareFeet || null,
          buildingsCount: payload.data.propertyInfo?.buildingsCount || null,
          carport: payload.data.propertyInfo?.carport,
          construction: payload.data.propertyInfo?.construction || null,
          deck: payload.data.propertyInfo?.deck || null,
          deckArea: payload.data.propertyInfo?.deckArea || null,
          featureBalcony: payload.data.propertyInfo?.featureBalcony,
          fireplace: payload.data.propertyInfo?.fireplace,
          fireplaces: payload.data.propertyInfo?.fireplaces || null,
          garageSquareFeet: payload.data.propertyInfo?.garageSquareFeet || null,
          garageType: payload.data.propertyInfo?.garageType || null,
          heatingFuelType: payload.data.propertyInfo?.heatingFuelType || null,
          heatingType: payload.data.propertyInfo?.heatingType || null,
          hoa: payload.data.propertyInfo?.hoa || null,
          interiorStructure:
            payload.data.propertyInfo?.interiorStructure || null,
          latitude: payload.data.propertyInfo?.latitude || null,
          livingSquareFeet: payload.data.propertyInfo?.livingSquareFeet || null,
          longitude: payload.data.propertyInfo?.longitude || null,
          lotSquareFeet: payload.data.propertyInfo?.lotSquareFeet || null,
          parcelAccountNumber:
            payload.data.propertyInfo?.parcelAccountNumber || null,
          parkingSpaces: payload.data.propertyInfo?.parkingSpaces || null,
          partialBathrooms: payload.data.propertyInfo?.partialBathrooms || null,
          patio: payload.data.propertyInfo?.patio,
          patioArea: payload.data.propertyInfo?.patioArea || null,
          plumbingFixturesCount:
            payload.data.propertyInfo?.plumbingFixturesCount || null,
          pool: payload.data.propertyInfo?.pool || null,
          poolArea: payload.data.propertyInfo?.poolArea || null,
          porchArea: payload.data.propertyInfo?.porchArea || null,
          porchType: payload.data.propertyInfo?.porchType || null,
          pricePerSquareFoot:
            payload.data.propertyInfo?.pricePerSquareFoot || null,
          propertyUse: payload.data.propertyInfo?.propertyUse || null,
          propertyUseCode: payload.data.propertyInfo?.propertyUseCode || null,
          roofConstruction: payload.data.propertyInfo?.roofConstruction || null,
          roofMaterial: payload.data.propertyInfo?.roofMaterial || null,
          roomsCount: payload.data.propertyInfo?.roomsCount || null,
          rvParking: payload.data.propertyInfo?.rvParking,
          safetyFireSprinklers: payload.data.propertyInfo?.safetyFireSprinklers,
          stories: payload.data.propertyInfo?.stories || null,
          taxExemptionHomeownerFlag:
            payload.data.propertyInfo?.taxExemptionHomeownerFlag,
          unitsCount: payload.data.propertyInfo?.unitsCount || null,
          utilitiesSewageUsage:
            payload.data.propertyInfo?.utilitiesSewageUsage || null,
          utilitiesWaterSource:
            payload.data.propertyInfo?.utilitiesWaterSource || null,
          yearBuilt: payload.data.propertyInfo?.yearBuilt || null,
        };

        const propertyInfoKeys = Object.keys(propertyInfo).join(", ");
        const propertyInfoPlaceholders = Object.keys(propertyInfo)
          .map(() => "?")
          .join(", ");
        const propertyInfoValues = Object.values(propertyInfo);

        const propertyInfoquery = `INSERT INTO propertyInfo (${propertyInfoKeys}) VALUES (${propertyInfoPlaceholders})`;

        const [result] = await connection.execute(
          propertyInfoquery,
          propertyInfoValues
        );
        if (result !== null) {
          console.log(`Inserted property info with DB ID: ${result.insertId}`);
        } else {
          console.log("Property info insert error");
        }
      }

      //...................................................................
      //Neighborhood
      if (payload.data?.neighborhood) {
        const neighborhood = {
          propertyId: payload.data?.id,
          center: payload.data.neighborhood?.center || null,
          neighborhoodIdExternal: payload.data.neighborhood?.id || null, // External neighborhood ID
          name: payload.data.neighborhood?.name || null,
          type: payload.data.neighborhood?.type || null,
        };

        const query = `
          INSERT INTO neighborhood (
            propertyId, center, neighborhoodIdExternal, name, type
          ) VALUES (?, ST_GeomFromText(?), ?, ?, ?)
        `;

        const values = [
          neighborhood.propertyId,
          neighborhood.center,
          neighborhood.neighborhoodIdExternal,
          neighborhood.name,
          neighborhood.type,
        ];

        try {
          const [result] = await connection.execute(query, values);
          if (result?.affectedRows > 0) {
            console.log(`Inserted neighborhood with DB ID: ${result.insertId}`);
          } else {
            console.log("Neighborhood data insert error");
          }
        } catch (error) {
          console.error("Error inserting neighborhood data:", error.message);
        }
      }

      //.................................................................
      //foreClosereInfo
      if (payload.data?.foreclosureInfo) {
        const foreclosureInfoData = payload.data.foreclosureInfo || {};

        // Extract all foreclosure records dynamically
        const allForeclosures = Object.keys(foreclosureInfoData).map((key) => {
          const foreclosure = foreclosureInfoData[key];

          return {
            propertyId: payload.data?.id,
            active: foreclosure?.active || null,
            auctionDate: foreclosure?.auctionDate?.split("T")[0], // Format date to YYYY-MM-DD
            auctionStreetAddress: foreclosure?.auctionStreetAddress || null,
            auctionTime: foreclosure?.auctionTime || null,
            caseNumber: foreclosure?.caseNumber || null,
            defaultAmount: foreclosure?.defaultAmount || null,
            documentType: foreclosure?.documentType || null,
            estimatedBankValue: foreclosure?.estimatedBankValue || null,
            foreclosureId: foreclosure?.foreclosureId || null,
            judgmentAmount: foreclosure?.judgmentAmount || null,
            judgmentDate: foreclosure?.judgmentDate?.split("T")[0], // Format date to YYYY-MM-DD
            lenderName: foreclosure?.lenderName || null,
            lenderPhone: foreclosure?.lenderPhone || null,
            noticeType: foreclosure?.noticeType || null,
            openingBid: foreclosure?.openingBid || null,
            originalLoanAmount: foreclosure?.originalLoanAmount || null,
            recordingDate: foreclosure?.recordingDate?.split("T")[0], // Format date to YYYY-MM-DD
            seqNo: foreclosure?.seqNo || null,
            trusteeAddress: foreclosure?.trusteeAddress || null,
            trusteeFullName: foreclosure?.trusteeFullName || null,
            trusteePhone: foreclosure?.trusteePhone || null,
            trusteeSaleNumber: foreclosure?.trusteeSaleNumber || null,
            typeName: foreclosure?.typeName || null,
          };
        });

        // Insert each foreclosure record into the database
        for (const foreclosure of allForeclosures) {
          const query = `
            INSERT INTO foreclosureInfo (
              propertyId, active, auctionDate, auctionStreetAddress, auctionTime,
              caseNumber, defaultAmount, documentType, estimatedBankValue, foreclosureId,
              judgmentAmount, judgmentDate, lenderName, lenderPhone, noticeType, openingBid,
              originalLoanAmount, recordingDate, seqNo, trusteeAddress, trusteeFullName,
              trusteePhone, trusteeSaleNumber, typeName
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
            foreclosure.propertyId,
            foreclosure.active,
            foreclosure.auctionDate || null,
            foreclosure.auctionStreetAddress,
            foreclosure.auctionTime,
            foreclosure.caseNumber,
            foreclosure.defaultAmount,
            foreclosure.documentType,
            foreclosure.estimatedBankValue,
            foreclosure.foreclosureId,
            foreclosure.judgmentAmount,
            foreclosure.judgmentDate || null,
            foreclosure.lenderName,
            foreclosure.lenderPhone,
            foreclosure.noticeType,
            foreclosure.openingBid,
            foreclosure.originalLoanAmount,
            foreclosure.recordingDate || null,
            foreclosure.seqNo,
            foreclosure.trusteeAddress,
            foreclosure.trusteeFullName,
            foreclosure.trusteePhone,
            foreclosure.trusteeSaleNumber,
            foreclosure.typeName,
          ];

          try {
            const [result] = await connection.execute(query, values);
            if (result?.affectedRows > 0) {
              console.log(
                `Inserted foreclosure record with DB ID: ${result.insertId}`
              );
            } else {
              console.log("Foreclosure data insert error");
            }
          } catch (error) {
            console.error("Error inserting foreclosure data:", error.message);
          }
        }
      }

      //..............................................................
      //taxHistory
      if (payload.data?.taxInfo) {
        const taxInfo = {
          propertyId: payload.data?.id,
          assessedImprovementValue:
            payload.data.taxInfo?.assessedImprovementValue || null,
          assessedLandValue: payload.data.taxInfo?.assessedLandValue || null,
          assessedValue: payload.data.taxInfo?.assessedValue || null,
          assessmentYear: payload.data.taxInfo?.assessmentYear || null,
          estimatedValue: payload.data.taxInfo?.estimatedValue || null,
          marketImprovementValue:
            payload.data.taxInfo?.marketImprovementValue || null,
          marketLandValue: payload.data.taxInfo?.marketLandValue || null,
          marketValue: payload.data.taxInfo?.marketValue || null,
          taxAmount: payload.data.taxInfo?.taxAmount || null,
          taxDelinquentYear: payload.data.taxInfo?.taxDelinquentYear || null,
          year: payload.data.taxInfo?.year || null,
        };

        const taxInfoKeys = Object.keys(taxInfo).join(", ");
        const taxInfoPlaceholders = Object.keys(taxInfo)
          .map(() => "?")
          .join(", ");
        const values = Object.values(taxInfo);

        const query = `INSERT INTO taxHistory (${taxInfoKeys}) VALUES (${taxInfoPlaceholders})`;

        try {
          const [result] = await connection.execute(query, values);
          if (result?.affectedRows > 0) {
            console.log(`Inserted tax info with DB ID: ${result.insertId}`);
          } else {
            console.log("Tax info data insert error");
          }
        } catch (error) {
          console.error("Error inserting tax info data:", error.message);
        }
      }

      //...................................................................
      //Owner Info
      if (payload.data?.ownerInfo) {
        const ownerInfo = {
          propertyId: payload.data?.id,
          absenteeOwner: payload.data.ownerInfo?.absenteeOwner || null,
          companyName: payload.data.ownerInfo?.companyName || null,
          corporateOwned: payload.data.ownerInfo?.corporateOwned || null,
          equity: payload.data.ownerInfo?.equity || null,
          inStateAbsenteeOwner:
            payload.data.ownerInfo?.inStateAbsenteeOwner || null,
          outOfStateAbsenteeOwner:
            payload.data.ownerInfo?.outOfStateAbsenteeOwner || null,
          owner1FirstName: payload.data.ownerInfo?.owner1FirstName || null,
          owner1FullName: payload.data.ownerInfo?.owner1FullName || null,
          owner1LastName: payload.data.ownerInfo?.owner1LastName || null,
          owner1Type: payload.data.ownerInfo?.owner1Type || null,
          owner2FirstName: payload.data.ownerInfo?.owner2FirstName || null,
          owner2FullName: payload.data.ownerInfo?.owner2FullName || null,
          owner2LastName: payload.data.ownerInfo?.owner2LastName || null,
          owner2Type: payload.data.ownerInfo?.owner2Type || null,
          owner3FirstName: payload.data.ownerInfo?.owner1FirstName || null,
          owner3FullName: payload.data.ownerInfo?.owner1FullName || null,
          owner3LastName: payload.data.ownerInfo?.owner1LastName || null,
          owner3Type: payload.data.ownerInfo?.owner1Type || null,
          owner4FirstName: payload.data.ownerInfo?.owner1FirstName || null,
          owner4FullName: payload.data.ownerInfo?.owner1FullName || null,
          owner4LastName: payload.data.ownerInfo?.owner1LastName || null,
          owner4Type: payload.data.ownerInfo?.owner1Type || null,
          ownerOccupied: payload.data.ownerInfo?.ownerOccupied || null,
          ownershipLength: payload.data.ownerInfo?.ownershipLength || null,
        };

        const ownerInfoKeys = Object.keys(ownerInfo).join(", ");
        const ownerInfoPlaceholders = Object.keys(ownerInfo)
          .map(() => "?")
          .join(", ");
        const ownerInfoValues = Object.values(ownerInfo);

        const query = `INSERT INTO ownerInfo (${ownerInfoKeys}) VALUES (${ownerInfoPlaceholders})`;

        try {
          const [result] = await connection.execute(query, ownerInfoValues);
          if (result?.affectedRows > 0) {
            console.log(`Inserted owner info with DB ID: ${result.insertId}`);
            const ownerInfoId = result.insertId;

            // Insert mailAddress
            const mailAddress = payload.data.ownerInfo?.mailAddress;
            if (mailAddress) {
              const mailAddressData = {
                ownerInfoId: ownerInfoId,
                address: mailAddress?.address,
                addressFormat: mailAddress?.addressFormat,
                carrierRoute: mailAddress?.carrierRoute,
                city: mailAddress?.city,
                county: mailAddress?.county,
                fips: mailAddress?.fips,
                house: mailAddress?.house,
                label: mailAddress?.label,
                preDirection: mailAddress?.preDirection,
                state: mailAddress?.state,
                street: mailAddress?.street,
                streetType: mailAddress?.streetType,
                unit: mailAddress?.unit,
                unitType: mailAddress?.unitType,
                zip: mailAddress?.zip,
                zip4: mailAddress?.zip4,
              };

              const mailAddressKeys = Object.keys(mailAddressData).join(", ");
              const mailAddressPlaceholders = Object.keys(mailAddressData)
                .map(() => "?")
                .join(", ");
              const mailAddressValues = Object.values(mailAddressData);

              const mailQuery = `INSERT INTO mailAddress (${mailAddressKeys}) VALUES (${mailAddressPlaceholders})`;

              try {
                const [mailResult] = await connection.execute(
                  mailQuery,
                  mailAddressValues
                );
                if (mailResult) {
                  console.log(
                    `Inserted mail address with DB ID: ${mailResult.insertId}`
                  );
                } else {
                  console.log("Mail address insert error");
                }
              } catch (mailError) {
                console.error(
                  "Error inserting mail address:",
                  mailError.message
                );
              }
            }
          } else {
            console.log("Owner info data insert error");
          }
        } catch (error) {
          console.error("Error inserting owner info:", error.message);
        }
      }

      // Close the database connection
      //await connection.end();

      // res.json({
      //   messageAPI: "Property detail data processed successfully",
      //   messageDB: "Property detail data processed and inserted successfully",
      // });

      //Property Return
      return;
    } else {
      // Handle unexpected null or missing result.insertId
      console.log("Failed to insert property data into the database");
      return;
    }
  } catch (error) {
    console.error("Error inserting property data:", error.message);
    throw new Error("Failed to insert property data");
  } finally {
    if (connection) {
      await connection.end();
      console.log("Database connection closed.");
    }
  }
};

module.exports = {
  insertProperty,
};
