import { useEffect, useState } from "react";
import { verifyToken } from "../src/utils/apis.js";

const useVerifyToken = () => {
  const [isValid, setIsValid] = useState(null);
  const [email, setEmail] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        const data = await verifyToken(token);
        console.log(data);
        setIsValid(data.valid);
        setEmail(data.email);
      } catch (err) {
        console.error(err);
        setIsValid(false);
      }
    };
    verify();
  }, [token]);

  return { isValid, email };
};

export { useVerifyToken };
