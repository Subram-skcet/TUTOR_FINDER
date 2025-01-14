import { GetUser } from "./getUser";

export const handleTabVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      GetUser(dispatch,location,navigate); 
    }
};