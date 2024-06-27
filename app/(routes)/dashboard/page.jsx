"use client";
import { app } from "@/Config/FirbaseConfig";
import { LogoutLink , useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import React , {useEffect , useState } from "react";
import {doc,getDoc, getFirestore} from "firebase/firestore"
import { useRouter } from "next/navigation";
function Dashboard() {
  const db = getFirestore(app);
  const {user}=useKindeBrowserClient(); 
  const [loading,setloading] = useState(true);
  const router=useRouter();
  useEffect(() => {
    user && isBusinessRegistered();
 
  }, [user])
  const isBusinessRegistered = async () => {
    const docRef = doc(db, "Business", user.email );

    const docSnap = await getDoc(docRef);
    console.log(docSnap,"docSnap")


    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setloading(false)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      setloading(false)
      router.replace('/create-business');
    }
  }
  if(loading)
  {
    return <h2>Loading...</h2>
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutLink>Logout</LogoutLink>
    </div>
  );
}

export default Dashboard;
