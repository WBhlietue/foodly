import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "./api";
import { Navigate } from "../../App";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "./api";
const loadedData = []; // iishee load hiisen datag hadgalna
const picDatas = [];

var user = {};
var userID;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);
var myrecipeList = [];

export function GetIsLogin() {
  return isLogged;
}
export function SetIsLogin(value) {
  isLogged = value;
}

// const app = initializeApp(firebaseConfig);

//num - hoolnii dugaar (primary key)

// export function GetWithNum(num) {
//   // herev load dotor baigaa bol shuud teriigee return
//   // tegehgu bol database iin hereglee ihesne
//   // baihgu bol database ees tatna
//   for (let i = 0; i < loadedData.length; i++) {
//     if (loadedData[i].num == num) {
//       return [loadedData[i], pic[num]];
//     }
//   }
//   num = num % data.length;
//   const d = data[num];
//   loadedData.push(d);
//   return [d, pic[d.num]];
// }

function RemoveElement(arr, elem) {
  const list = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != elem) {
      list.push(arr[i]);
    }
  }
  return list;
}

export async function GetPicture(num) {
  const res = await getDownloadURL(ref(storage, "images/" + num + ".jpeg"));
  return { uri: res };
}

export async function GetRandonFood() {
  // avahdaa filter ajilna
  // return GetWithNum(rand);
  const data = await getDocs(
    query(collection(fireStore, "recipe"), orderBy("num"))
  );
  var d = [];

  data.forEach((i) => {
    d.push(i.data());
  });
  const backUP = d;
  for (let i = 0; i < d.length; i++) {
    for (let j in user.filter) {
      if (d[i].material.indexOf(j) >= 0) {
        d = RemoveElement(d, d[i]);
      }
    }
  }
  if (d.length == 0) {
    d = back;
  }
  let rand = Math.floor(Math.random() * d.length);
  var a = d[rand];
  return a;
}

export function GetFoodsByCategory(num, category) {
  // category dotroos num shirheg avna
}

export function LoginTo(email, pass, onComplete, onError) {
  signInWithEmailAndPassword(auth, email, pass)
    .then((u) => {
      userID = u.user.uid;
      getDoc(doc(fireStore, "user", u.user.uid)).then((snap) => {
        user = snap.data();
        onComplete();
      });
    })
    .catch((error) => {
      onError(error);
    });
}

export function Logout() {
  signOut(auth);
}

export async function RegisterTo(userName, email, pass, onComplete, onError) {
  createUserWithEmailAndPassword(auth, email, pass)
    .then((u) => {
      user = {
        userName: userName,
        email: email,
        favorite: [],
        own: [],
        filter: [],
      };
      userID = u.user.uid;
      setDoc(doc(fireStore, "user", u.user.uid), user)
        .then(() => {
          onComplete();
        })
        .catch(() => {});
    })
    .catch((error) => {
      onError(error);
    });
}

export async function GetPopular(num) {
  let list = [];
  const q = query(
    collection(fireStore, "recipe"),
    orderBy("favorite", "desc"),
    limit(num)
  );
  const doc = await getDocs(q);
  doc.forEach((i) => {
    list.push(i.data());
  });
  return list;
}
export async function GetView(num) {
  let list = [];
  const q = query(
    collection(fireStore, "recipe"),
    orderBy("view", "desc"),
    limit(num)
  );
  const doc = await getDocs(q);
  doc.forEach((i) => {
    list.push(i.data());
  });
  return list;
}

export function Comment(num, comment) {}

export async function AddFavorite(num, fav) {
  var stat;
  if (user.favorite.indexOf(num) >= 0) {
    const list = [];
    stat = 0;
    user.favorite.map((i) => {
      if (i != num) {
        list.push(i);
      }
    });
    user.favorite = list;
  } else {
    stat = 1;
    user.favorite.push(num);
  }
  await updateDoc(doc(fireStore, "user", userID), { favorite: user.favorite });
  updateDoc(doc(fireStore, "recipe", "r" + num), {
    favorite: fav + (stat == 0 ? -1 : 1),
  });
  return stat;
}

export async function Upload(
  name,
  type,
  kkal,
  difficult,
  time,
  material,
  description,
  howto,
  imageUri,
  onComplete,
  onError
) {
  // const getBlobFroUri = async (uri) => {
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function (e) {
  //       reject(new TypeError("Network request failed"));
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("GET", uri, true);
  //     xhr.send(null);
  //   });

  //   return blob;
  // };
  const response = await fetch(imageUri);
  const blob = await response.blob();
  if (user.own.length == 0) {
    user.own = [];
  }
  const mat = material.split(" ");
  const step = howto.split(".");
  getDoc(doc(fireStore, "num", "num"))
    .then((snap) => {
      const num = snap.data().num + 1;
      setDoc(doc(fireStore, "num", "num"), { num: num }).then(() => {});
      const data = {
        num: num,
        name: name,
        type: type,
        kkal: kkal,
        difficult: difficult,
        time: time,
        material: mat,
        description: description,
        howto: step,
        user: user.userName,
        view: 0,
        favorite: 0,
      };
      setDoc(doc(fireStore, "recipe", "r" + num), data)
        .then(() => {
          myrecipeList.push(data);
          user.own.push(num);
          updateDoc(doc(fireStore, "user", userID), { own: user.own })
            .then(() => {
              onComplete();
            })

            .catch((error) => {
              onError(error);
            });
        })
        .catch((error) => {
          onError(error);
        });
      const picMeta = { contentType: "image/jpeg" };
      uploadBytes(ref(storage, "images/" + num + ".jpeg"), blob, picMeta).then(
        (res) => {
          console.log(res);
        }
      );
    })
    .catch((error) => {
      onError(error);
    })
    .catch((error) => {
      onError(error.code);
    });
}

export async function GetMyRecipes() {
  const my = [];

  for (let i = 0; i < user.own.length; i++) {
    let data = await getDoc(doc(fireStore, "recipe", "r" + user.own[i]));
    my.push(data.data());
    console.log(my);
  }
  return my;
}

export function Edit(json) {}

export async function Delete(num) {
  //user ni uuriinhuu upload hiisniig ustgana
  await deleteDoc(doc(fireStore, "recipe", "r" + num));
  await deleteObject(ref(storage, "images/" + num + ".jpeg"));
  user.own = RemoveElement(user.own, num);
  await updateDoc(doc(fireStore, "user", userID), { own: user.own });
}

export async function GetFavorites() {
  if (user.favorite.length == 0) {
    return [];
  }
  const q = query(collection(fireStore, "recipe"), orderBy("num"));
  const list = [];
  const data = await getDocs(q);
  data.forEach((i) => {
    if (user.favorite.indexOf(i.data().num) >= 0) {
      list.push(i.data());
    }
  });
  return list;
}

export function GetIsFav(num) {
  return user.favorite.indexOf(num) >= 0 ? 1 : 0;
}

export async function GetAllMaterials() {
  const list = [];
  const q = query(collection(fireStore, "recipe"), orderBy("num"));
  const s = await getDocs(q);
  s.forEach((i) => {
    i.data().material.map((j) => {
      if (list.indexOf(j) == -1) {
        list.push(j);
      }
    });
  });
  return list;
}

export function GetFilters() {
  return user.filter;
}

export async function SetFilter(text) {
  let num;
  if (user.filter.indexOf(text) == -1) {
    num = 1;
    user.filter.push(text);
  } else {
    const list = [];
    user.filter.map((i) => {
      if (i != text) {
        list.push(i);
      }
    });
    user.filter = list;
  }
  await updateDoc(doc(fireStore, "user", userID), { filter: user.filter });
  return num;
}

export function SetView(num, view) {
  updateDoc(doc(fireStore, "recipe", "r" + num), { view: view + 1 });
}

/*

    json format:
        hool = {
            num:1, -> primary key
            name:test,
            category:test,
            kkal:100,
            difficult:easy,
            time:3min,
            orts:nani, nani, nani,
            step:ehleed blabla, daraa ni blabla...,
        }
        comment = {
            num:1, -> hoolni cod
            comments:[
                {
                    userID:001,
                    comment:nani kore
                },
                {
                    userID:002,
                    comment:nani kore
                },
                                {
                    userID:003,
                    comment:nani kore
                }
            ]
        }

        user = {
            userID:001,
            userName:Dio Brando,
            userPic: https://www.....png,
            favorite:[foodNum1, foodNum2 ...],
            uploads:[foodNum1, foodNum2 ...],
            filter: [...] 
        }

*/

