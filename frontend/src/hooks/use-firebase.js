import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  set,
} from "firebase/database";

import firebaseApp from "../services/firebase";

const useFirebase = (path) => {
  const [data, setData] = useState();
  const [errors, setErrors] = useState();

  //logic for connecting to reference point in RealtimeDB
  useEffect(() => {
    //connect to app database with config settings
    const database = getDatabase(firebaseApp);

    //define what area of the database you want to access
    const pathRef = ref(database, path);
    console.log(path);
    onValue(
      pathRef,
      (snapshot) => {
        //send new data to react with setData every time information changed on realtime db
        const newData = snapshot.val();
        setData(newData);
      },
      (error) => {
        setErrors(error);
      }
    );
  }, [path]);

  //logic to add new entrie to RealtimeDB
  const addItem = (newItem) => {
    const database = getDatabase(firebaseApp);
    const pathRef = ref(database, path);
    // console.log(path);
    set(pathRef, newItem);
  };

  const updateItem = (newItem) => {
    const database = getDatabase(firebaseApp);
    const pathRef = ref(database, path);
    // console.log(path);
    push(pathRef, newItem);
  };

  return {
    data,
    errors,
    addItem,
  };
};

export default useFirebase;
