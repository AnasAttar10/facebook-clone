import Icon, { TIcons } from "@components/Common/Icon/Icon";
import FlexWrapper from "@components/Common/FlexWrapper/FlexWrapper";
import { hoverColor } from "@utils/colors";
import { useState } from "react";
const RectangleIcons = [
  { icon: "home", to: "home" },
  { icon: "tvVideo", to: "watch" },
  { icon: "market", to: "marketplace" },
  { icon: "group", to: "groups" },
  { icon: "game", to: "gaming" },
];
const Center = () => {
  const [activeTap, setActiveTap] = useState("home");
  const handlesetActiveTap = (targetTap: TIcons) => setActiveTap(targetTap);
  return (
    <FlexWrapper $xposition="center" $reversx="true">
      {RectangleIcons.map((i, idx) => (
        <Icon
          key={idx}
          icon={i.icon as TIcons}
          color={activeTap === i.icon ? "blue" : "black"}
          size="lg"
          $xposition="center"
          $yposition="center"
          $bg="white"
          $bghover={activeTap === i.icon ? "white" : hoverColor}
          width="100px"
          height="50px"
          $borderradius={activeTap === i.icon ? "0" : "10px"}
          $clickable="true"
          $borderbottom={activeTap === i.icon ? "3px solid blue" : "0"}
          islink
          to={i.to}
          onclick={() => handlesetActiveTap(i.icon as TIcons)}
        />
      ))}
    </FlexWrapper>
  );
};

export default Center;
