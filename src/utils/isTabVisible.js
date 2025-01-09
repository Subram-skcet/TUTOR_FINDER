import { GetUser } from "./getUser";

export const handleTabVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      console.log("Tab is now active");
      GetUser(dispatch,location,navigate); 
    }
};