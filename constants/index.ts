import home from "../public/icons/Home.svg";
import upcaming from "../public/icons/upcoming.svg";
import previous from "../public/icons/previous.svg";
import recording from "../public/icons/recordings.svg";
import peronal from "../public/icons/add-personal.svg";

export const sidebarLinks = [
  {
    label: "Home",
    route: "/",
    imgUrl: home,
  },
  {
    label: "Upcaming",
    route: "/upcaming",
    imgUrl: upcaming,
  },
  {
    label: "Previous",
    route: "/previous",
    imgUrl: previous,
  },
  {
    label: "Recording",
    route: "/recording",
    imgUrl: recording,
  },
  {
    label: "Personal Room",
    route: "/personal-room",
    imgUrl: peronal,
  },
];
