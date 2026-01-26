import { useState } from "react";
import { AuthContext } from "./authContext";

export const AuthContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [campForm, setCampForm] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [yourCamp, setYourCamp] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        formData,
        setFormData,
        loading,
        setLoading,
        showPassword,
        setShowPassword,
        campForm,
        setCampForm,
        yourCamp,
        setYourCamp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
