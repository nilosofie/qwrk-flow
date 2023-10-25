//uid list array returns email addresses
export const uidsToEmail = async (uidArray, displayNameObj) => {
  const retArr = [];
  const displayNameObjLoc = await displayNameObj;

  console.log(displayNameObjLoc);

  uidArray.forEach((uid) => {
    const i = displayNameObjLoc.findIndex((obj) => {
      return obj.uid === uid;
    });

    i !== -1 ? retArr.push(displayNameObjLoc[i].email) : retArr.push(uid);
  });
  console.log(retArr);
  return retArr;
};

//uid string returns displayname string

export const uidToDisplay = async (uid, displayNameObj) => {
  const displayNameObjLoc = await displayNameObj;

  const i = displayNameObjLoc.findIndex((obj) => {
    return obj.uid === uid;
  });

  console.log("I", i);
  displayNameObjLoc[i] &&
    console.log("Displayname", displayNameObjLoc[i].displayName);

  return i !== -1 ? displayNameObjLoc[i].displayName : undefined;
};
