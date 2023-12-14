import React, {useState, useEffect} from "react";


const Header = () => {
    const [userName, setUserName] = useState("");
  
    useEffect(() => {
      const storedName = localStorage.getItem("quizz_name");
  
      if (storedName) {
        setUserName(storedName);
      }
    }, []); 
  
    return (
        <div className="p-4 fixed top-0 left-0 z-50">
            <p className="text-left">Utilisateur connecté : <strong>{userName}</strong></p>
        </div>
    );
  };

export default Header;
